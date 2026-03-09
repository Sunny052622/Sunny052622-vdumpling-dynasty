const { Client } = require('pg');
const https = require('https');
const { CASHFREE_APP_ID, CASHFREE_SECRET } = require('./cashfree-config');

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:Maababa800@vdd-vip.cjmg4468ylwn.ap-south-1.rds.amazonaws.com:5432/postgres?sslmode=require';
const RESEND_API_KEY = 're_Y7bLXKKY_PxTZSzNN2L42avv9eX3YiY3S';

const REPORT_EMAILS = [
  'ceo@narparfoods.com',
  'shobhrajsharma@gmail.com',
  'ttamasamishra@gmail.com',
];

function httpsRequest(method, hostname, path, extraHeaders, body) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method, headers: { ...extraHeaders } };
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// Send instant notification email when payment is confirmed
async function sendPaymentNotification(customer) {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const dob = customer.date_of_birth
    ? new Date(customer.date_of_birth).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '-';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
  <div style="background:linear-gradient(135deg,#16a34a,#15803d);border-radius:16px 16px 0 0;padding:28px;text-align:center;">
    <p style="margin:0;font-size:40px;">🎉</p>
    <h1 style="margin:8px 0 0;color:white;font-size:22px;font-weight:700;">New VIP Elite Member!</h1>
  </div>
  <div style="background:white;padding:28px 32px;border-radius:0 0 16px 16px;border:1px solid #e5e7eb;border-top:none;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;width:120px;">Name</td><td style="padding:10px 0;font-size:16px;font-weight:700;color:#111827;">${customer.name}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">Mobile</td><td style="padding:10px 0;font-size:16px;color:#111827;">+91 ${customer.mobile_number}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">DOB</td><td style="padding:10px 0;font-size:16px;color:#111827;">${dob}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">Payment Code</td><td style="padding:10px 0;font-size:16px;font-weight:700;color:#DC143C;font-family:monospace;">${customer.payment_code}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">Amount Paid</td><td style="padding:10px 0;font-size:16px;font-weight:700;color:#16a34a;">₹301</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">Payment Status</td><td style="padding:10px 0;"><span style="font-size:12px;font-weight:600;color:#16a34a;background:#f0fdf4;padding:4px 12px;border-radius:20px;">PAID</span></td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:#6b7280;">Time</td><td style="padding:10px 0;font-size:14px;color:#6b7280;">${now}</td></tr>
    </table>
  </div>
  <div style="text-align:center;padding:20px 0;">
    <p style="font-size:12px;color:#9ca3af;margin:0;">From <a href="https://narprafoods.com/admin" style="color:#DC143C;text-decoration:none;">VDD Admin Dashboard</a></p>
  </div>
</div></body></html>`;

  try {
    await httpsRequest('POST', 'api.resend.com', '/emails', {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    }, JSON.stringify({
      from: 'VDD Admin <onboarding@resend.dev>',
      to: REPORT_EMAILS,
      subject: `🎉 New VIP Elite Member: ${customer.name} (+91 ${customer.mobile_number})`,
      html,
    }));
    console.log('Payment notification email sent for:', customer.name);
  } catch (err) {
    console.error('Failed to send notification email:', err.message);
  }
}

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const orderId = event.queryStringParameters?.order_id;
  if (!orderId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'order_id is required' }) };
  }

  let client;
  try {
    // Step 1: Verify payment with Cashfree
    const cfResult = await httpsRequest('GET', 'api.cashfree.com', `/pg/orders/${orderId}`, {
      'x-client-id': CASHFREE_APP_ID,
      'x-client-secret': CASHFREE_SECRET,
      'x-api-version': '2023-08-01',
    });

    console.log('Cashfree verify:', cfResult.status, JSON.stringify(cfResult.data));

    const orderStatus = cfResult.data?.order_status;
    const customerName = cfResult.data?.customer_details?.customer_name || '';

    // Step 2: If PAID, update database
    if (orderStatus === 'PAID') {
      // Extract registration_id from order_id (format: vdd_{timestamp}_{reg_id})
      const parts = orderId.split('_');
      const registrationId = parts.length >= 3 ? parts[parts.length - 1] : null;

      client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
      await client.connect();

      if (registrationId) {
        await client.query(
          `UPDATE vip_registrations SET payment_status = 'paid' WHERE id = $1`,
          [registrationId]
        );
        console.log(`Updated registration ${registrationId} to paid`);

        // Fetch customer details for email
        const custResult = await client.query(
          `SELECT name, mobile_number, date_of_birth, payment_code FROM vip_registrations WHERE id = $1`,
          [registrationId]
        );

        if (custResult.rows.length > 0) {
          // Send instant email notification
          await sendPaymentNotification(custResult.rows[0]);
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        order_id: orderId,
        order_status: orderStatus,
        customer_name: customerName,
      }),
    };
  } catch (error) {
    console.error('Verify payment error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  } finally {
    if (client) await client.end().catch(() => {});
  }
};

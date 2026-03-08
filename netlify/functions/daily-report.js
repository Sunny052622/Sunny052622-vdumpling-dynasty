const { Client } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:Maababa800@vdd-vip.cjmg4468ylwn.ap-south-1.rds.amazonaws.com:5432/postgres?sslmode=require';

// Resend API key
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Y7bLXKKY_PxTZSzNN2L42avv9eX3YiY3S';

// Email recipients
const REPORT_EMAILS = [
  'ceo@narparfoods.com',
  'shobhrajsharma@gmail.com',
  'ttamasamishra@gmail.com',
];

// Sender — Resend free tier default (can change after domain verification)
const FROM_EMAIL = 'VDD Admin <onboarding@resend.dev>';

// ─── Scheduled: runs at 12:00 AM IST (18:30 UTC previous day) ───
// Netlify cron schedule is defined in netlify.toml

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let client;
  try {
    // Connect to AWS RDS
    client = new Client({
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    // Get today's registrations (IST = UTC+5:30)
    // We query for records created in the last 24 hours
    const result = await client.query(
      `SELECT id, name, date_of_birth, mobile_number, payment_code, payment_status, created_at
       FROM vip_registrations
       WHERE created_at >= NOW() - INTERVAL '24 hours'
       ORDER BY created_at DESC`
    );

    const registrations = result.rows;
    const count = registrations.length;

    // Build the email
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    });

    // Build HTML table rows
    let tableRows = '';
    if (count > 0) {
      registrations.forEach((r, i) => {
        const dob = r.date_of_birth
          ? new Date(r.date_of_birth).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
          : '-';
        const time = r.created_at
          ? new Date(r.created_at).toLocaleString('en-IN', {
              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
              timeZone: 'Asia/Kolkata',
            })
          : '-';
        const statusColor = r.payment_status === 'paid' ? '#16a34a' : '#d97706';
        const statusBg = r.payment_status === 'paid' ? '#f0fdf4' : '#fffbeb';

        tableRows += `
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 12px 16px; font-size: 14px; color: #6b7280;">${i + 1}</td>
            <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #111827;">${r.name}</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #4b5563;">+91 ${r.mobile_number}</td>
            <td style="padding: 12px 16px; font-size: 14px; color: #4b5563;">${dob}</td>
            <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #DC143C; font-family: monospace;">${r.payment_code}</td>
            <td style="padding: 12px 16px;">
              <span style="font-size: 12px; font-weight: 600; color: ${statusColor}; background: ${statusBg}; padding: 4px 10px; border-radius: 20px;">
                ${r.payment_status || 'pending'}
              </span>
            </td>
            <td style="padding: 12px 16px; font-size: 13px; color: #9ca3af;">${time}</td>
          </tr>`;
      });
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 700px; margin: 0 auto; padding: 32px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #DC143C, #b91c3c); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700;">
        VDumpling Dynasty
      </h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
        Daily VIP Registration Report
      </p>
    </div>

    <!-- Summary Card -->
    <div style="background: white; padding: 24px 32px; border-bottom: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div>
          <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Date</p>
          <p style="margin: 4px 0 0; font-size: 18px; font-weight: 700; color: #111827;">${today}</p>
        </div>
        <div style="margin-left: auto; text-align: right;">
          <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">New Registrations</p>
          <p style="margin: 4px 0 0; font-size: 36px; font-weight: 800; color: #DC143C;">${count}</p>
        </div>
      </div>
    </div>

    <!-- Table or No Data -->
    <div style="background: white; border-radius: 0 0 16px 16px; overflow: hidden;">
      ${count > 0 ? `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">#</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Name</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Mobile</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">DOB</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Code</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Status</th>
              <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Time</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      ` : `
        <div style="padding: 48px 32px; text-align: center;">
          <p style="font-size: 18px; color: #9ca3af; margin: 0;">No new registrations today</p>
          <p style="font-size: 14px; color: #d1d5db; margin: 8px 0 0;">Better luck tomorrow! 🍜</p>
        </div>
      `}
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px 0;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        This is an automated report from <a href="https://narprafoods.com/admin" style="color: #DC143C; text-decoration: none;">VDD Admin Dashboard</a>
      </p>
    </div>

  </div>
</body>
</html>`;

    // Send email via Resend API
    const subject = count > 0
      ? `📋 ${count} New VIP Registration${count > 1 ? 's' : ''} — ${today}`
      : `📋 Daily VIP Report — No new registrations — ${today}`;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: REPORT_EMAILS,
        subject,
        html: emailHtml,
      }),
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      console.error('Resend API error:', emailData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send email', details: emailData }),
      };
    }

    console.log(`Daily report sent: ${count} registrations to ${REPORT_EMAILS.join(', ')}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        registrations: count,
        emailId: emailData.id,
        sentTo: REPORT_EMAILS,
      }),
    };
  } catch (error) {
    console.error('Daily report error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (client) {
      await client.end().catch(() => {});
    }
  }
};

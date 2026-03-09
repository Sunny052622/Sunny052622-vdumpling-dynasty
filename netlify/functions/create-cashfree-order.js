const https = require('https');
const { CASHFREE_APP_ID, CASHFREE_SECRET, ORDER_AMOUNT, RETURN_URL } = require('./cashfree-config');

function postJSON(hostname, path, data, extraHeaders) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = https.request({
      hostname,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...extraHeaders,
      },
    }, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(responseBody) }); }
        catch { resolve({ status: res.statusCode, data: responseBody }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
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

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { name, phone, registration_id } = JSON.parse(event.body);

    if (!name || !phone || !registration_id) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const orderId = `vdd_${Date.now()}_${registration_id}`;

    const result = await postJSON('api.cashfree.com', '/pg/orders', {
      order_id: orderId,
      order_amount: ORDER_AMOUNT,
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust_${registration_id}`,
        customer_phone: phone,
        customer_name: name,
      },
      order_meta: {
        return_url: RETURN_URL,
      },
    }, {
      'x-client-id': CASHFREE_APP_ID,
      'x-client-secret': CASHFREE_SECRET,
      'x-api-version': '2023-08-01',
    });

    console.log('Cashfree create order:', result.status, JSON.stringify(result.data));

    if (result.status >= 400) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create payment order', details: result.data }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        payment_session_id: result.data.payment_session_id,
        order_id: result.data.order_id || orderId,
        cf_order_id: result.data.cf_order_id,
      }),
    };
  } catch (error) {
    console.error('Create order error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};

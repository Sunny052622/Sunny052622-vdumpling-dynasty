const { Client } = require('pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL not configured');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Database not configured' }),
    };
  }

  let client;
  try {
    const { name, date_of_birth, mobile_number, payment_code } = JSON.parse(event.body);

    if (!name || !date_of_birth || !mobile_number || !payment_code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const result = await client.query(
      `INSERT INTO vip_registrations (name, date_of_birth, mobile_number, payment_code, registration_date, created_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, payment_code`,
      [name, date_of_birth, mobile_number, payment_code]
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        id: result.rows[0].id,
        payment_code: result.rows[0].payment_code,
      }),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save registration' }),
    };
  } finally {
    if (client) {
      await client.end().catch(() => {});
    }
  }
};

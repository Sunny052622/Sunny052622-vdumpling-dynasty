const { Client } = require('pg');

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Database not configured' }),
    };
  }

  let client;
  try {
    client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const result = await client.query(
      `SELECT id, name, date_of_birth, mobile_number, payment_code, payment_status, created_at
       FROM vip_registrations
       ORDER BY created_at DESC
       LIMIT 100`
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        total: result.rowCount,
        registrations: result.rows,
      }),
    };
  } catch (error) {
    console.error('Database error:', error);
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

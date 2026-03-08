const { Client } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:Maababa800@vdd-vip.cjmg4468ylwn.ap-south-1.rds.amazonaws.com:5432/postgres?sslmode=require';

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const DATABASE_URL = DB_URL;

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

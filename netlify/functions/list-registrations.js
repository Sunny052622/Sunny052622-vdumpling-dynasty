const { Client } = require('pg');

const DB_URL = process.env.DATABASE_URL;

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // --- Auth check: require token in Authorization header ---
  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized — login required' }),
    };
  }

  const DATABASE_URL = DB_URL;

  let client;
  try {
    client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    // Auto-create table if it doesn't exist (fresh DB)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vip_registrations (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        date_of_birth DATE NOT NULL,
        mobile_number TEXT NOT NULL,
        payment_code TEXT NOT NULL UNIQUE,
        payment_status TEXT DEFAULT 'pending',
        registration_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

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

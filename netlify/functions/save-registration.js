const { Client } = require('pg');

const DB_URL = process.env.DATABASE_URL;

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

  const DATABASE_URL = DB_URL;

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

    // Auto-create table if it doesn't exist
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
    await client.query(`CREATE INDEX IF NOT EXISTS idx_mobile ON vip_registrations(mobile_number)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_payment_code ON vip_registrations(payment_code)`);

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

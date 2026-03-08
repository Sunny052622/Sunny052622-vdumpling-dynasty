// Simple test function — no schedule, just test the pieces
const { Client } = require('pg');

const DB_URL = 'postgresql://postgres:Maababa800@vdd-vip.cjmg4468ylwn.ap-south-1.rds.amazonaws.com:5432/postgres?sslmode=require';

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };
  const steps = [];

  // Step 1: Test DB connection
  let client;
  let count = 0;
  try {
    client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
    await client.connect();
    steps.push('DB connected OK');

    const result = await client.query(
      `SELECT COUNT(*) as cnt FROM vip_registrations WHERE created_at >= NOW() - INTERVAL '24 hours'`
    );
    count = parseInt(result.rows[0].cnt);
    steps.push(`DB query OK: ${count} registrations in last 24h`);
  } catch (err) {
    steps.push(`DB error: ${err.message}`);
  } finally {
    if (client) await client.end().catch(() => {});
  }

  // Step 2: Test Resend API with just 1 email
  try {
    const https = require('https');
    const body = JSON.stringify({
      from: 'VDD Admin <onboarding@resend.dev>',
      to: ['shobhrajsharma@gmail.com'],
      subject: 'VDD Test Email - Please Ignore',
      html: '<h2>Test from VDD</h2><p>If you see this, the daily report will work!</p>',
    });

    const emailResult = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'Authorization': 'Bearer re_Y7bLXKKY_PxTZSzNN2L42avv9eX3YiY3S',
        },
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, body: data });
        });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });

    steps.push(`Resend API: status=${emailResult.status}, response=${emailResult.body}`);
  } catch (err) {
    steps.push(`Resend error: ${err.message}`);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ steps, count }),
  };
};

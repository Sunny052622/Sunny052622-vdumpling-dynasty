const crypto = require('crypto');

// Admin credentials — change these to your preferred username/password
const ADMIN_USERNAME = 'vddadmin';
const ADMIN_PASSWORD = 'Vdd@2024!';
const TOKEN_SECRET = 'vdd-admin-secret-key-2024';

// Generate a simple auth token
const generateToken = (username) => {
  const payload = `${username}:${Date.now()}:${TOKEN_SECRET}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
};

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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Username and password are required' }),
      };
    }

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid username or password' }),
      };
    }

    // Generate token
    const token = generateToken(username);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token,
        message: 'Login successful',
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }
};

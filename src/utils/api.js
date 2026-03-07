const API_BASE = '/.netlify/functions';

export async function saveRegistration({ name, dob, mobile, paymentCode }) {
  try {
    const response = await fetch(`${API_BASE}/save-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        date_of_birth: dob,
        mobile_number: mobile,
        payment_code: paymentCode,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to save registration');
    }

    return await response.json();
  } catch (err) {
    console.error('Registration API error:', err);
    throw err;
  }
}

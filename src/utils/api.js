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

export async function createCashfreeOrder({ name, phone, registrationId }) {
  try {
    const response = await fetch(`${API_BASE}/create-cashfree-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        registration_id: registrationId,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to create payment order');
    }

    return await response.json();
  } catch (err) {
    console.error('Cashfree order API error:', err);
    throw err;
  }
}

export async function verifyCashfreePayment(orderId) {
  try {
    const response = await fetch(`${API_BASE}/verify-cashfree-payment?order_id=${orderId}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to verify payment');
    }

    return await response.json();
  } catch (err) {
    console.error('Verify payment API error:', err);
    throw err;
  }
}

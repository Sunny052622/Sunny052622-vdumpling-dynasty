import { useState, useCallback, useEffect } from 'react';
import {
  calculateSavings,
  calculateSIPFutureValue,
  getRandomReward,
  generatePaymentCode,
} from '../utils/calculatorUtils';
import { saveRegistration, verifyCashfreePayment } from '../utils/api';

export function useCalculator() {
  const [screen, setScreen] = useState('input');
  const [visits, setVisits] = useState(8);
  const [orderValue, setOrderValue] = useState('');
  const [results, setResults] = useState(null);
  const [registration, setRegistration] = useState({ name: '', dob: '', mobile: '' });
  const [paymentCode, setPaymentCode] = useState('');
  const [registrationId, setRegistrationId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  // On mount: check if returning from Cashfree redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');

    if (orderId) {
      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);

      // Verify payment
      setVerifyingPayment(true);
      setScreen('success');

      verifyCashfreePayment(orderId)
        .then((data) => {
          if (data.order_status === 'PAID') {
            setPaymentVerified(true);
            setRegistration((prev) => ({
              ...prev,
              name: data.customer_name || prev.name,
            }));
          } else {
            setError(`Payment ${data.order_status || 'not completed'}. Please try again.`);
            setScreen('payment');
          }
        })
        .catch((err) => {
          console.error('Payment verification failed:', err);
          setError('Could not verify payment. Please contact support.');
          setScreen('payment');
        })
        .finally(() => {
          setVerifyingPayment(false);
        });
    }
  }, []);

  const calculate = useCallback(() => {
    const val = parseFloat(orderValue);
    if (isNaN(val) || val <= 0) return;

    const savings = calculateSavings(visits, val);
    const sip = savings.netSavings > 0 ? calculateSIPFutureValue(savings.netSavings) : null;
    const reward = savings.netSavings > 0 ? getRandomReward(savings.netSavings) : null;
    setResults({ ...savings, sip, reward });
    setScreen('results');
  }, [visits, orderValue]);

  const goToRegistration = useCallback(() => {
    setError(null);
    setScreen('registration');
  }, []);

  const goBackToResults = useCallback(() => {
    setScreen('results');
  }, []);

  const goBackToRegistration = useCallback(() => {
    setScreen('registration');
  }, []);

  const submitRegistration = useCallback(async (formData) => {
    setRegistration(formData);
    setIsSubmitting(true);
    setError(null);

    const code = generatePaymentCode(formData.mobile);
    setPaymentCode(code);

    try {
      const result = await saveRegistration({
        name: formData.name,
        dob: formData.dob,
        mobile: formData.mobile,
        paymentCode: code,
      });
      setRegistrationId(result.id);
    } catch (err) {
      console.error('Failed to save registration:', err);
      // Still continue to payment — we'll capture the data
      setRegistrationId(Date.now().toString());
    } finally {
      setIsSubmitting(false);
      setScreen('payment');
    }
  }, []);

  const reset = useCallback(() => {
    setScreen('input');
    setVisits(8);
    setOrderValue('');
    setResults(null);
    setRegistration({ name: '', dob: '', mobile: '' });
    setPaymentCode('');
    setRegistrationId(null);
    setError(null);
    setPaymentVerified(false);
  }, []);

  return {
    screen,
    visits,
    setVisits,
    orderValue,
    setOrderValue,
    results,
    registration,
    paymentCode,
    registrationId,
    isSubmitting,
    error,
    paymentVerified,
    verifyingPayment,
    calculate,
    goToRegistration,
    goBackToResults,
    goBackToRegistration,
    submitRegistration,
    reset,
  };
}

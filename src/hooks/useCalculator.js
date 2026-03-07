import { useState, useCallback } from 'react';
import {
  calculateSavings,
  calculateSIPFutureValue,
  getRandomReward,
  generatePaymentCode,
} from '../utils/calculatorUtils';
import { saveRegistration } from '../utils/api';

export function useCalculator() {
  const [screen, setScreen] = useState('input');
  const [visits, setVisits] = useState(8);
  const [orderValue, setOrderValue] = useState('');
  const [results, setResults] = useState(null);
  const [registration, setRegistration] = useState({ name: '', dob: '', mobile: '' });
  const [paymentCode, setPaymentCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const submitRegistration = useCallback(async (formData) => {
    setRegistration(formData);
    setIsSubmitting(true);
    setError(null);

    const code = generatePaymentCode(formData.mobile);
    setPaymentCode(code);

    try {
      await saveRegistration({
        name: formData.name,
        dob: formData.dob,
        mobile: formData.mobile,
        paymentCode: code,
      });
    } catch (err) {
      // Continue to success even if API fails — registration is captured in the payment code
      console.error('Failed to save registration:', err);
    } finally {
      setIsSubmitting(false);
      setScreen('success');
    }
  }, []);

  const reset = useCallback(() => {
    setScreen('input');
    setVisits(8);
    setOrderValue('');
    setResults(null);
    setRegistration({ name: '', dob: '', mobile: '' });
    setPaymentCode('');
    setError(null);
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
    isSubmitting,
    error,
    calculate,
    goToRegistration,
    goBackToResults,
    submitRegistration,
    reset,
  };
}

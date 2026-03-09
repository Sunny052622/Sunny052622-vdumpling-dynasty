import React, { useState } from 'react';
import { CARD_FEE, formatCurrency } from '../../utils/calculatorUtils';
import { createCashfreeOrder } from '../../utils/api';

const PaymentScreen = ({ registration, registrationId, paymentCode, goBackToRegistration, onPaymentStarted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Cashfree order via backend
      const order = await createCashfreeOrder({
        name: registration.name,
        phone: registration.mobile,
        registrationId,
      });

      if (!order.payment_session_id) {
        throw new Error('No payment session received');
      }

      // Step 2: Open Cashfree checkout
      // eslint-disable-next-line no-undef
      const cashfree = Cashfree({ mode: 'production' });

      cashfree.checkout({
        paymentSessionId: order.payment_session_id,
        redirectTarget: '_self',
      });

      // User will be redirected — this code won't run after redirect
      if (onPaymentStarted) onPaymentStarted(order.order_id);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="calc-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-nepal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nepal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Complete Payment</h2>
        <p className="text-sm text-gray-500">Pay to activate your VIP Elite Card</p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-nepal-red/20 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-nepal-red/10 rounded-full"></div>

        <div className="relative">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">VIP Elite Card</p>
          <p className="text-lg font-semibold mb-4">{registration.name}</p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400">Mobile</p>
              <p className="text-sm">+91 {registration.mobile}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Amount</p>
              <p className="text-3xl font-bold text-nepal-red">{formatCurrency(CARD_FEE)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* What you get */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2 text-sm">What you get:</h3>
        <ul className="text-sm text-green-700 space-y-1.5">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            <span>10% discount on orders above ₹155 <span className="text-green-600 font-medium">[including GST]</span></span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Exclusive VIP Elite membership card
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Priority access to new menu items
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Atleast 25% off on your birthday
          </li>
        </ul>
        <div className="mt-3 pt-3 border-t border-green-200">
          <p className="text-xs text-green-600 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Card activation takes 24 hours after payment
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Pay Button */}
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-nepal-red hover:bg-nepal-red/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-lg shadow-nepal-red/20"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Processing...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay {formatCurrency(CARD_FEE)} Securely
          </>
        )}
      </button>

      {/* Secure badge */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-xs text-gray-400">Secured by Cashfree Payments</span>
      </div>

      {/* Back link */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={goBackToRegistration}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back to Registration
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;

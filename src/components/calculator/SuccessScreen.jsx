import React, { useEffect, useState } from 'react';
import { CARD_FEE, formatCurrency } from '../../utils/calculatorUtils';

// CSS confetti piece
const ConfettiPiece = ({ index }) => {
  const colors = ['#DC143C', '#FFD700', '#16a34a', '#3b82f6', '#f97316', '#a855f7', '#ec4899'];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = 2.5 + Math.random() * 2;
  const size = 6 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-10px',
        width: `${size}px`,
        height: `${size * 0.6}px`,
        backgroundColor: color,
        borderRadius: '2px',
        transform: `rotate(${rotation}deg)`,
        animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
        opacity: 0,
      }}
    />
  );
};

const SuccessScreen = ({ paymentCode, registration, paymentVerified, verifyingPayment, reset }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (paymentVerified) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [paymentVerified]);

  // Verifying state
  if (verifyingPayment) {
    return (
      <div className="calc-fade-in text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nepal-red mx-auto mb-4"></div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Verifying Payment...</h2>
        <p className="text-sm text-gray-500">Please wait while we confirm your payment</p>
      </div>
    );
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>VIP Elite Card Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            .badge { display: inline-block; background: #16a34a; color: white; padding: 6px 16px;
                     border-radius: 20px; font-size: 14px; font-weight: bold; margin: 10px 0; }
            .code { font-size: 28px; font-weight: bold; letter-spacing: 4px; font-family: monospace;
                     padding: 20px; border: 3px dashed #DC143C; border-radius: 12px; margin: 20px 0; }
            .details { text-align: left; margin: 20px auto; max-width: 300px; }
            .details p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1 style="color:#DC143C;">VDumpling Dynasty</h1>
          <h2>VIP Elite Member Card</h2>
          ${paymentVerified ? '<div class="badge">PAYMENT CONFIRMED</div>' : ''}
          ${paymentCode ? `<div class="code">${paymentCode}</div>` : ''}
          <div class="details">
            <p><strong>Name:</strong> ${registration.name}</p>
            <p><strong>Mobile:</strong> +91 ${registration.mobile}</p>
            <p><strong>Amount:</strong> ${formatCurrency(CARD_FEE)}</p>
          </div>
          <p style="margin-top: 30px; color: #666;">Please collect your Elite Card from any VDumpling Dynasty outlet.</p>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="calc-fade-in relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 50 }, (_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      {/* Confetti keyframes */}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
        @keyframes celebratePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-6 relative z-20">
        <div
          className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-200"
          style={{ animation: paymentVerified ? 'celebratePulse 2s ease-in-out infinite' : 'none' }}
        >
          <span className="text-3xl">{paymentVerified ? '👑' : '✅'}</span>
        </div>

        {paymentVerified ? (
          <>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
              You are now an <span className="text-nepal-red">Elite Member!</span>
            </h2>
            <p className="text-sm text-gray-600">
              Please collect your Elite Card from our outlet
            </p>
            <div className="inline-flex items-center gap-1.5 mt-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Payment Confirmed
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Registration Complete</h2>
            <p className="text-sm text-gray-600">Your registration has been saved</p>
          </>
        )}
      </div>

      {/* VIP Code */}
      {paymentCode && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-5 mb-5 border border-red-200">
          <div className="text-center">
            <p className="text-xs font-medium text-red-900 mb-2 uppercase tracking-wider">Your VIP Code</p>
            <div className="bg-white rounded-xl p-4 border-2 border-dashed border-nepal-red/40">
              <p className="text-2xl font-bold text-red-900 tracking-wider font-mono">{paymentCode}</p>
            </div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium text-gray-900">{registration.name}</span>
          </div>
          {registration.mobile && (
            <div className="flex justify-between">
              <span className="text-gray-500">Mobile</span>
              <span className="font-medium text-gray-900">+91 {registration.mobile}</span>
            </div>
          )}
          {registration.dob && (
            <div className="flex justify-between">
              <span className="text-gray-500">DOB</span>
              <span className="font-medium text-gray-900">
                {new Date(registration.dob).toLocaleDateString('en-IN')}
              </span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-nepal-red">{formatCurrency(CARD_FEE)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            {paymentVerified ? (
              <span className="text-green-600 font-semibold">Paid</span>
            ) : (
              <span className="text-amber-600 font-semibold">Pending</span>
            )}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      {paymentVerified && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Next Steps
          </h3>
          <ol className="text-sm text-blue-700 space-y-1.5 list-decimal list-inside">
            <li>Visit any VDumpling Dynasty outlet</li>
            <li>Show this screen or your VIP code to the cashier</li>
            <li>Collect your physical Elite Card</li>
            <li>Start enjoying 10% off on every order!</li>
          </ol>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="flex-1 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors py-2.5 px-4 rounded-xl border border-gray-200 hover:border-gray-300"
        >
          Start Over
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 bg-gray-900 hover:bg-black text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;

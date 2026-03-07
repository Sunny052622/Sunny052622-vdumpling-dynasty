import React from 'react';

const SuccessScreen = ({ paymentCode, registration, reset }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>VIP Card Payment Code</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: monospace;
                     padding: 20px; border: 3px dashed #DC143C; border-radius: 12px; margin: 20px 0; }
            .details { text-align: left; margin: 20px auto; max-width: 300px; }
            .details p { margin: 8px 0; }
            .instructions { text-align: left; margin: 20px auto; max-width: 400px; }
            .instructions li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <h1>VDumpling Dynasty - VIP Card</h1>
          <h2>Payment Code</h2>
          <div class="code">${paymentCode}</div>
          <div class="details">
            <p><strong>Name:</strong> ${registration.name}</p>
            <p><strong>Mobile:</strong> +91 ${registration.mobile}</p>
            <p><strong>Amount:</strong> ₹255</p>
          </div>
          <div class="instructions">
            <h3>Instructions:</h3>
            <ol>
              <li>Visit any of our store counters</li>
              <li>Show this payment code to the cashier</li>
              <li>Pay ₹255 to activate your VIP card</li>
              <li>Start enjoying 10% discount on all purchases!</li>
            </ol>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="calc-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Code Generated</h2>
        <p className="text-sm text-gray-600">Present this code at the counter to pay your VIP card fee</p>
      </div>

      {/* Payment Code */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 mb-6 border border-red-200">
        <div className="text-center">
          <p className="text-sm font-medium text-red-900 mb-2">Your Payment Code</p>
          <div className="bg-white rounded-xl p-4 border-2 border-dashed border-nepal-red/40">
            <p className="text-2xl font-bold text-red-900 tracking-wider font-mono">{paymentCode}</p>
          </div>
          <p className="text-xs text-red-700 mt-2">Show this code to the cashier</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-nepal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Payment Instructions
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          {[
            'Visit any of our store counters',
            'Show this payment code to the cashier',
            'Pay ₹255 to activate your VIP card',
            'Start enjoying 10% discount on all purchases!',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-nepal-red font-bold">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Registration Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Registration Details</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Name:</span> {registration.name}</p>
          <p><span className="font-medium">Mobile:</span> +91 {registration.mobile}</p>
          <p>
            <span className="font-medium">DOB:</span>{' '}
            {registration.dob ? new Date(registration.dob).toLocaleDateString('en-IN') : ''}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="flex-1 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors py-2 px-4 rounded-lg border border-gray-200 hover:border-gray-300"
        >
          Start Over
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 bg-gray-900 hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Print Code
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;

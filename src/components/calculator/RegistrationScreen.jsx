import React, { useState } from 'react';

const RegistrationScreen = ({ goBackToResults, submitRegistration, isSubmitting }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    submitRegistration({ name, dob, mobile });
  };

  return (
    <div className="calc-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nepal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">VIP Card Registration</h2>
        <p className="text-sm text-gray-600">Complete your details to activate your VIP card offer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="customerName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-nepal-red focus:border-nepal-red outline-none transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="customerDOB" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="customerDOB"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-nepal-red focus:border-nepal-red outline-none transition-all"
          />
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="customerMobile" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium">
              +91
            </div>
            <input
              type="tel"
              id="customerMobile"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-nepal-red focus:border-nepal-red outline-none transition-all"
              placeholder="Enter 10-digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              inputMode="numeric"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This number will be used to activate your VIP card offer
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-nepal-red hover:bg-nepal-red/90 text-white font-medium py-3 rounded-xl transition-colors mt-6 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving...' : 'Submit & Get Payment Code'}
        </button>
      </form>

      {/* Back */}
      <button
        type="button"
        onClick={goBackToResults}
        className="w-full mt-4 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
      >
        ← Back to Results
      </button>
    </div>
  );
};

export default RegistrationScreen;

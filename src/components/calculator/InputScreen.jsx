import React from 'react';

const InputScreen = ({ visits, setVisits, orderValue, setOrderValue, calculate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    calculate();
  };

  return (
    <div className="calc-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-full h-36 bg-red-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
          <img
            src="/images/calculator/hero-calculator.svg"
            alt="VIP Card Savings Calculator"
            className="w-full h-full object-contain p-4"
            loading="eager"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Savings Calculator</h1>
        <p className="text-gray-500 text-sm mt-2">See how much you can save with our VIP Card.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Visits slider */}
        <div className="space-y-4 relative">
          <div className="flex justify-between items-end">
            <label htmlFor="visits" className="block text-sm font-medium text-gray-700">
              Monthly Visits
            </label>
            <div className="bg-red-50 px-3 py-1 rounded-lg">
              <span className="text-nepal-red font-bold text-lg">{visits}</span>
              <span className="text-nepal-red/70 text-xs font-medium ml-1">times/month</span>
            </div>
          </div>
          <div className="relative pt-2">
            <input
              type="range"
              id="visits"
              min="1"
              max="30"
              step="1"
              value={visits}
              onChange={(e) => setVisits(parseInt(e.target.value))}
              className="calculator-slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium px-1">
              <span>1</span>
              <span>15</span>
              <span>30+</span>
            </div>
          </div>
        </div>

        {/* Order value */}
        <div className="space-y-2 relative">
          <label htmlFor="orderValue" className="block text-sm font-medium text-gray-700">
            Average Order Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium text-lg">
              ₹
            </div>
            <input
              type="number"
              id="orderValue"
              min="1"
              step="0.01"
              placeholder="e.g. 500"
              required
              value={orderValue}
              onChange={(e) => setOrderValue(e.target.value)}
              inputMode="decimal"
              className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-xl focus:ring-2 focus:ring-nepal-red focus:border-nepal-red outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white font-medium py-4 rounded-xl shadow-lg shadow-gray-900/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
        >
          Calculate Savings
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputScreen;

import React from 'react';
import { CARD_FEE, formatCurrency, getMultiplierMessage } from '../../utils/calculatorUtils';

const ResultsScreen = ({ results, reset, goToRegistration }) => {
  if (!results) return null;

  const { yearlySpend, grossSavings, netSavings, multiplier, sip, reward } = results;
  const isPositive = netSavings > 0;

  return (
    <div className="calc-fade-in">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Your Yearly Projection
      </h3>

      <div className="space-y-4">
        {/* Yearly Spend */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Estimated Total Spend</span>
          <span className="font-semibold text-gray-900">{formatCurrency(yearlySpend)}</span>
        </div>

        {/* Gross Savings */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">10% Card Discount</span>
          <span className="font-semibold text-nepal-red">+{formatCurrency(grossSavings)}</span>
        </div>

        {/* Card Fee */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">One-time Card Fee</span>
          <span className="font-semibold text-red-500">-{formatCurrency(CARD_FEE)}</span>
        </div>

        <div className="pt-4 border-t border-gray-100 border-dashed" />

        {/* Success Animation */}
        {isPositive && (
          <div className="w-full h-24 bg-red-50 rounded-xl relative overflow-hidden flex items-center justify-center mb-4">
            <img
              src="/images/calculator/success-animation.svg"
              alt="Success"
              className="w-full h-full object-contain rounded-xl"
              loading="lazy"
            />
          </div>
        )}

        {/* Net Savings */}
        <div
          className={`rounded-xl p-5 border transition-all ${
            isPositive
              ? 'bg-red-50 border-red-100'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`block text-sm font-medium ${isPositive ? 'text-red-900' : 'text-gray-700'}`}>
              Your Net Savings
            </span>
            {isPositive && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {multiplier.toFixed(1)}X
              </div>
            )}
          </div>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold tracking-tight ${isPositive ? 'text-nepal-red' : 'text-gray-800'}`}>
              {formatCurrency(netSavings)}
            </span>
            <span className={`font-medium text-sm mb-1 ${isPositive ? 'text-nepal-red/70' : 'text-gray-500'}`}>
              / year
            </span>
          </div>
          <p className={`text-sm mt-2 font-medium ${isPositive ? 'text-nepal-red' : 'text-gray-600'}`}>
            {isPositive
              ? getMultiplierMessage(multiplier)
              : 'You need to visit more often to make the card worth it.'}
          </p>
        </div>

        {/* Bonus Comparison */}
        {isPositive && (reward || (sip && sip.monthlySavings >= 600)) && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              What could this mean?
            </h4>
            <ul className="text-sm text-gray-600 space-y-4">
              {reward && (
                <li className="flex items-start gap-3 leading-snug">
                  <span className="text-xl">🛍️</span>
                  <span>
                    <strong>Reward yourself:</strong> {reward}
                  </span>
                </li>
              )}
              {sip && sip.monthlySavings >= 600 && (
                <li className="flex items-start gap-3 leading-snug">
                  <span className="text-xl">📈</span>
                  <span>
                    <strong>Invest it:</strong> A ₹{Math.round(sip.monthlySavings).toLocaleString('en-IN')}/mo SIP in a Mutual Fund (est. 12% p.a.) could grow to{' '}
                    <strong>{formatCurrency(sip.futureValue)}</strong> in 1 year!
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={reset}
          className="flex-1 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors py-2 px-4 rounded-lg border border-gray-200 hover:border-gray-300"
        >
          Recalculate
        </button>
        <button
          type="button"
          onClick={goToRegistration}
          className="flex-1 bg-nepal-red hover:bg-nepal-red/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Buy VIP Card
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;

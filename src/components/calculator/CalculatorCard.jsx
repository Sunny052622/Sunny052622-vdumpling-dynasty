import React from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import InputScreen from './InputScreen';
import ResultsScreen from './ResultsScreen';
import RegistrationScreen from './RegistrationScreen';
import SuccessScreen from './SuccessScreen';
import './calculator.css';

const CalculatorCard = () => {
  const calc = useCalculator();

  return (
    <div className="bg-white max-w-md w-full rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8 overflow-hidden">
      {calc.screen === 'input' && (
        <InputScreen
          visits={calc.visits}
          setVisits={calc.setVisits}
          orderValue={calc.orderValue}
          setOrderValue={calc.setOrderValue}
          calculate={calc.calculate}
        />
      )}
      {calc.screen === 'results' && (
        <ResultsScreen
          results={calc.results}
          reset={calc.reset}
          goToRegistration={calc.goToRegistration}
        />
      )}
      {calc.screen === 'registration' && (
        <RegistrationScreen
          goBackToResults={calc.goBackToResults}
          submitRegistration={calc.submitRegistration}
          isSubmitting={calc.isSubmitting}
        />
      )}
      {calc.screen === 'success' && (
        <SuccessScreen
          paymentCode={calc.paymentCode}
          registration={calc.registration}
          reset={calc.reset}
        />
      )}
    </div>
  );
};

export default CalculatorCard;

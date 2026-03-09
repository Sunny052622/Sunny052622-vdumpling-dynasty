import React from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import InputScreen from './InputScreen';
import ResultsScreen from './ResultsScreen';
import RegistrationScreen from './RegistrationScreen';
import PaymentScreen from './PaymentScreen';
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
      {calc.screen === 'payment' && (
        <PaymentScreen
          registration={calc.registration}
          registrationId={calc.registrationId}
          paymentCode={calc.paymentCode}
          goBackToRegistration={calc.goBackToRegistration}
        />
      )}
      {calc.screen === 'success' && (
        <SuccessScreen
          paymentCode={calc.paymentCode}
          registration={calc.registration}
          paymentVerified={calc.paymentVerified}
          verifyingPayment={calc.verifyingPayment}
          reset={calc.reset}
        />
      )}
    </div>
  );
};

export default CalculatorCard;

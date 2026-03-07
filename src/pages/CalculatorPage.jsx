import React from 'react';
import { Helmet } from 'react-helmet-async';
import CalculatorCard from '../components/calculator/CalculatorCard';

const CalculatorPage = () => (
  <>
    <Helmet>
      <title>VIP Card Savings Calculator | VDumpling Dynasty</title>
      <meta
        name="description"
        content="Calculate your potential savings with our VIP membership card. Get 10% discount on all orders at VDumpling Dynasty."
      />
    </Helmet>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CalculatorCard />
    </div>
  </>
);

export default CalculatorPage;

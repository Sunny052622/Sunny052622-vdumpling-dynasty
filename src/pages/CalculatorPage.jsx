import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-semibold transition-colors"
        >
          <ArrowLeft size={16} /> Back to site
        </Link>
      </div>
      <CalculatorCard />
    </div>
  </>
);

export default CalculatorPage;

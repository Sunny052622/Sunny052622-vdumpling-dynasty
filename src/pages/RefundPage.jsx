import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const RefundPage = () => (
  <>
    <Helmet>
      <title>Refund Policy | VDumpling Dynasty</title>
      <meta name="description" content="Refund and Cancellation Policy for VDumpling Dynasty (Narprabha Foods LLP) — when and how refunds are processed." />
      <link rel="canonical" href="https://narprafoods.com/refund" />
    </Helmet>

    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

        <div className="mb-8">
          <Link to="/" className="text-nepal-red text-sm font-semibold hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Refund &amp; Cancellation Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2026 &nbsp;|&nbsp; Narprabha Foods LLP</p>

        <Section title="1. Food Orders (via Petpooja / Online Ordering)">
          <p>
            All food orders placed through our outlet ordering pages (powered by Petpooja) are subject to Petpooja's order management and cancellation policies.
            Once an order is confirmed and preparation has begun, cancellation is generally not possible.
          </p>
          <p>
            If you receive an incorrect or unsatisfactory order, please contact the outlet directly within <strong>30 minutes</strong> of receiving it.
            Refunds for food orders are evaluated on a case-by-case basis and processed within <strong>5–7 business days</strong> to the original payment method.
          </p>
        </Section>

        <Section title="2. VDD Elite Card Registration">
          <p>
            The VDD Elite membership fee is non-refundable once the card has been issued and activated.
          </p>
          <p>
            If a payment is debited but no confirmation is received within 24 hours, please write to us at{' '}
            <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a> with your payment reference.
            We will investigate and process a refund within <strong>7 business days</strong> if the registration cannot be confirmed.
          </p>
        </Section>

        <Section title="3. Payment Failures">
          <p>
            In the event of a payment failure where your account is debited but the transaction is not confirmed, the amount will automatically be reversed
            by your bank or Cashfree Payments within <strong>5–7 business days</strong>. If the reversal does not appear within this period, please contact us.
          </p>
        </Section>

        <Section title="4. How to Request a Refund">
          <p>To request a refund, please email <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a> with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your full name and mobile number</li>
            <li>Order ID or payment reference number</li>
            <li>Date of transaction</li>
            <li>Reason for refund request</li>
          </ul>
        </Section>

        <Section title="5. Processing Time">
          <p>
            Approved refunds are processed within <strong>5–7 business days</strong>. The time for the amount to reflect in your account may vary depending on your bank or payment method.
          </p>
        </Section>

      </div>
    </div>
  </>
);

export default RefundPage;

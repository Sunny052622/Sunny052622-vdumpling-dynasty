import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const PrivacyPage = () => (
  <>
    <Helmet>
      <title>Privacy Policy | VDumpling Dynasty</title>
      <meta name="description" content="Privacy Policy for VDumpling Dynasty (Narprabha Foods LLP) — how we collect, use, and protect your data." />
      <link rel="canonical" href="https://narprafoods.com/privacy" />
    </Helmet>

    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

        <div className="mb-8">
          <Link to="/" className="text-nepal-red text-sm font-semibold hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2026 &nbsp;|&nbsp; Narprabha Foods LLP</p>

        <Section title="1. Introduction">
          <p>
            Narprabha Foods LLP ("we", "our", "us") operates VDumpling Dynasty and narprafoods.com.
            This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website and services.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact information</strong> — name, mobile number, email address (e.g., when you register for VDD Elite or contact us)</li>
            <li><strong>Date of birth</strong> — for VDD Elite membership age verification</li>
            <li><strong>Payment information</strong> — processed entirely by Cashfree Payments; we do not store card or bank details</li>
            <li><strong>Usage data</strong> — browser type, IP address, pages visited, collected via standard web analytics</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and confirm VDD Elite card registrations</li>
            <li>To send order confirmations and transactional communications</li>
            <li>To respond to inquiries and customer support requests</li>
            <li>To improve our website and services</li>
            <li>To comply with applicable legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing">
          <p>We do not sell your personal data. We may share it with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cashfree Payments</strong> — for secure payment processing</li>
            <li><strong>Petpooja</strong> — for online order management</li>
            <li><strong>Resend</strong> — for transactional email delivery</li>
            <li>Government authorities, if required by law</li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes described in this policy, or as required by law.
            VDD Elite registration data is retained for the duration of the membership program.
          </p>
        </Section>

        <Section title="6. Security">
          <p>
            We implement industry-standard security measures to protect your data. Our database is hosted on encrypted, access-controlled cloud infrastructure.
            Payments are handled entirely by PCI DSS-compliant Cashfree Payments.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>Under applicable Indian data protection law, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal obligations)</li>
          </ul>
          <p>To exercise these rights, email us at <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a>.</p>
        </Section>

        <Section title="8. Cookies">
          <p>
            Our website may use cookies to improve your browsing experience. You can disable cookies in your browser settings;
            however, some features of the site may not function correctly without them.
          </p>
        </Section>

        <Section title="9. Changes to this Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised date.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            For privacy-related queries, contact us at <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a>.
          </p>
        </Section>

      </div>
    </div>
  </>
);

export default PrivacyPage;

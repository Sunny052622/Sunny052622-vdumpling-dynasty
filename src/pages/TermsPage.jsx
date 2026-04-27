import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const TermsPage = () => (
  <>
    <Helmet>
      <title>Terms &amp; Conditions | VDumpling Dynasty</title>
      <meta name="description" content="Terms and Conditions for VDumpling Dynasty (Narprabha Foods LLP) — online ordering, payments, and use of narprafoods.com." />
      <link rel="canonical" href="https://narprafoods.com/terms" />
    </Helmet>

    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

        <div className="mb-8">
          <Link to="/" className="text-nepal-red text-sm font-semibold hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms &amp; Conditions</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2026 &nbsp;|&nbsp; Narprabha Foods LLP</p>

        <Section title="1. About Us">
          <p>
            VDumpling Dynasty is a brand operated by <strong>Narprabha Foods LLP</strong>, a limited liability partnership registered in India,
            with outlets in Bhubaneswar and Cuttack, Odisha. Our website is <strong>narprafoods.com</strong>.
          </p>
        </Section>

        <Section title="2. Acceptance of Terms">
          <p>
            By accessing or using narprafoods.com, you agree to be bound by these Terms &amp; Conditions and all applicable laws and regulations.
            If you do not agree with any of these terms, please do not use this website.
          </p>
        </Section>

        <Section title="3. Online Ordering">
          <p>
            Clicking "Order Online" on our website redirects you to your selected outlet's ordering page, hosted by our POS partner <strong>Petpooja</strong>.
            All food orders are placed and fulfilled through that platform. Narprabha Foods LLP is responsible for food preparation and quality;
            Petpooja is responsible for the ordering interface.
          </p>
          <p>
            Prices displayed on narprafoods.com are indicative. Final prices, including applicable taxes and packaging charges, are confirmed on the Petpooja ordering page.
          </p>
        </Section>

        <Section title="4. Payments">
          <p>
            Payments for online orders are processed securely by <strong>Cashfree Payments</strong>, a PCI DSS-compliant payment gateway.
            Narprabha Foods LLP does not store any card or payment credentials.
            For VIP Card registrations on narprafoods.com, payments are processed through Cashfree's payment link infrastructure.
          </p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content on narprafoods.com — including text, images, logos, and branding — is the property of Narprabha Foods LLP and is protected by applicable intellectual property laws.
            You may not reproduce or distribute any content without prior written permission.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            Narprabha Foods LLP shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or any third-party platforms linked from it.
            Our liability is limited to the amount paid for the specific order or service in question.
          </p>
        </Section>

        <Section title="7. Governing Law">
          <p>
            These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bhubaneswar, Odisha.
          </p>
        </Section>

        <Section title="8. Changes to Terms">
          <p>
            We reserve the right to update these Terms at any time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            For any questions regarding these Terms, please contact us at <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a> or
            visit our <Link to="/contact" className="text-nepal-red hover:underline">Contact page</Link>.
          </p>
        </Section>

      </div>
    </div>
  </>
);

export default TermsPage;

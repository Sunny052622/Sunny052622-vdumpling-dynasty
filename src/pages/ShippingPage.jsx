import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const ShippingPage = () => (
  <>
    <Helmet>
      <title>Shipping Policy | VDumpling Dynasty</title>
      <meta name="description" content="Shipping and Delivery Policy for VDumpling Dynasty (Narprabha Foods LLP) — how and when your orders are delivered." />
      <link rel="canonical" href="https://narprafoods.com/shipping" />
    </Helmet>

    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

        <div className="mb-8">
          <Link to="/" className="text-nepal-red text-sm font-semibold hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Shipping &amp; Delivery Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2026 &nbsp;|&nbsp; Narprabha Foods LLP</p>

        <Section title="1. Nature of Our Business">
          <p>
            VDumpling Dynasty (operated by Narprabha Foods LLP) is a Quick Service Restaurant (QSR) chain.
            We serve food at our dine-in outlets and through third-party delivery aggregators.
            Our primary product — freshly prepared food — is not a physical product shipped via courier.
          </p>
        </Section>

        <Section title="2. Dine-In">
          <p>
            Walk into any of our outlets and enjoy your meal on the spot. No delivery lead time applies.
            Our outlets are located in Kalinganagar, Patia, Saheed Nagar (Bhubaneswar), and CDA 9 (Cuttack).
          </p>
        </Section>

        <Section title="3. Online Ordering (Takeaway &amp; Delivery)">
          <p>
            Online orders placed through our Petpooja-powered outlet pages are for <strong>takeaway or home delivery</strong> (where available).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Preparation time:</strong> 15–30 minutes from order confirmation, depending on order size and outlet load</li>
            <li><strong>Delivery radius:</strong> As configured per outlet on the Petpooja platform</li>
            <li><strong>Delivery charges:</strong> Displayed at checkout on the Petpooja ordering page</li>
          </ul>
          <p>
            Delivery is fulfilled by the outlet's internal delivery team or a third-party partner.
            Narprabha Foods LLP is not responsible for delays caused by external factors (traffic, weather, etc.).
          </p>
        </Section>

        <Section title="4. VDD Elite Card Delivery">
          <p>
            The VDD Elite membership card is a <strong>physical card</strong> issued and handed over at your registered outlet upon verification.
            No postal shipping is involved. You will be notified via WhatsApp/SMS when your card is ready for pickup.
          </p>
          <p>
            Card pickup timeline: typically within <strong>3–5 business days</strong> of payment confirmation.
          </p>
        </Section>

        <Section title="5. No Physical Product Shipping">
          <p>
            We do not ship physical merchandise, packaged food products, or any goods via postal or courier services at this time.
            All food is prepared fresh and consumed on-site or delivered locally through our outlets.
          </p>
        </Section>

        <Section title="6. Contact">
          <p>
            For any delivery-related concerns, contact the outlet directly or email us at{' '}
            <a href="mailto:ceo@narprafood.com" className="text-nepal-red hover:underline">ceo@narprafood.com</a>.
          </p>
        </Section>

      </div>
    </div>
  </>
);

export default ShippingPage;

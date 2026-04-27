import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const OUTLETS_CONTACT = [
  {
    name: 'VDD Kalinganagar',
    address: 'Near Anandaban Park, Kalinganagar, Bhubaneswar — 751003',
    mapUrl: 'https://maps.google.com/?q=VDumpling+Dynasty+Kalinganagar+Bhubaneswar',
  },
  {
    name: 'VDD Patia',
    address: 'Galaxia Garden, Infocity, Patia, Bhubaneswar — 751024',
    mapUrl: 'https://maps.google.com/?q=VDumpling+Dynasty+Patia+Bhubaneswar',
  },
  {
    name: 'VDD Saheed Nagar',
    address: 'Near Water Tank, Saheed Nagar, Bhubaneswar — 751007',
    mapUrl: 'https://maps.google.com/?q=VDumpling+Dynasty+Saheednagar+Bhubaneswar',
  },
  {
    name: 'VDD Cuttack',
    address: 'CDA 9, Cuttack — 753014',
    mapUrl: 'https://maps.google.com/?q=VDumpling+Dynasty+Cuttack',
  },
];

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact Us | VDumpling Dynasty</title>
      <meta name="description" content="Get in touch with VDumpling Dynasty. Find our outlet addresses, phone number, and email. Operated by Narprabha Foods LLP." />
      <link rel="canonical" href="https://narprafoods.com/contact" />
    </Helmet>

    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <Link to="/" className="text-nepal-red text-sm font-semibold hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">We'd love to hear from you. Reach out through any of the channels below.</p>

        {/* General Contact */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">General Enquiries</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-nepal-red" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Phone</p>
                <a href="tel:+919040018192" className="text-gray-900 font-semibold hover:text-nepal-red transition-colors">+91 9040018192</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-nepal-red" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                <a href="mailto:ceo@narprafood.com" className="text-gray-900 font-semibold hover:text-nepal-red transition-colors">ceo@narprafood.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-nepal-red" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Hours</p>
                <p className="text-gray-900 font-semibold">11:00 AM – 10:00 PM, All Days</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Legal Entity</p>
            <p className="text-gray-600 text-sm">Narprabha Foods LLP</p>
            <p className="text-gray-500 text-xs mt-1">GSTIN: [update before KYC submission]</p>
            <p className="text-gray-500 text-xs">FSSAI: [update before KYC submission]</p>
          </div>
        </div>

        {/* Outlet Locations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Our Outlets</h2>
          <div className="space-y-5">
            {OUTLETS_CONTACT.map((outlet) => (
              <div key={outlet.name} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-nepal-red" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{outlet.name}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{outlet.address}</p>
                  <a
                    href={outlet.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nepal-red text-xs font-semibold hover:underline mt-1 inline-block"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </>
);

export default ContactPage;

import React from 'react';

const OfferCardThemed = ({ title, description, flyerUrl, onLearnMore }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-nepal-blue hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold text-nepal-red mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
            onClick={() => onLearnMore(flyerUrl)}
            className="text-nepal-blue hover:underline font-semibold transition duration-300 focus:outline-none"
        >
            Learn More &rarr;
        </button>
    </div>
);

export default OfferCardThemed;

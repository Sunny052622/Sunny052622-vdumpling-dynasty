import React from 'react';
import { Link } from 'react-router-dom';

const MenuTeaser = ({ onNavigate, onOpenOutletModal }) => (
    <section id="menu-teaser" className="py-16 bg-gradient-to-r from-nepal-blue to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Ready for Amazing Momos?</h2>
            <p className="mb-10 text-lg max-w-xl mx-auto text-blue-100">
                Explore our full menu of authentic dumplings, hearty thukpas, and delicious Himalayan-inspired dishes.
            </p>
            <Link
                to="/menu"
                className="inline-block bg-white text-nepal-blue px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                See Full Menu
            </Link>
        </div>
    </section>
);

export default MenuTeaser;

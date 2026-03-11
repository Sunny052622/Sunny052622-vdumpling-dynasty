import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { OUTLETS, getMapUrl } from '../data';

const Footer = ({ onOpenOutletModal }) => (
    <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12 border-t-4 border-nepal-blue">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
                <div>
                    <div className="flex items-center mb-3">
                        <img
                            src="/images/logo-circle.png"
                            alt="VDumpling Dynasty Logo"
                            className="w-10 h-10 mr-3"
                            onError={(e) => {
                                console.error('Logo failed to load');
                                e.target.style.display = 'none';
                            }}
                        />
                        <h3 className="text-2xl font-bold text-white">Narprabha Foods LLP</h3>
                    </div>
                    <p className="text-sm leading-relaxed">Your spot for authentic Nepali flavors in Bhubaneswar.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#home" className="hover:text-white transition duration-200">Home</a></li>
                        <li><button onClick={onOpenOutletModal} className="hover:text-white transition duration-200 text-left">Menu</button></li>
                        <li><a href="#offers" className="hover:text-white transition duration-200">Offers</a></li>
                        <li><a href="#about-journey" className="hover:text-white transition duration-200">About</a></li>
                        <li><a href="#contact" className="hover:text-white transition duration-200">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        {OUTLETS.map((outlet) => (
                            <li key={outlet.id} className="flex items-start space-x-2">
                                <MapPin size={16} className="text-nepal-red flex-shrink-0 mt-1" />
                                <div>
                                    <span className="font-semibold text-white">{outlet.name}:</span>
                                    <a
                                        href={getMapUrl(outlet)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-gray-400 hover:text-white hover:underline transition-colors"
                                    >
                                        {outlet.shortAddress}
                                        <ExternalLink size={12} className="opacity-60" />
                                    </a>
                                </div>
                            </li>
                        ))}
                        <li className="flex items-center space-x-2"><Phone size={16} className="text-nepal-red flex-shrink-0" /><a href="tel:+919040018192" className="hover:text-white transition-colors">+91 9040018192</a></li>
                        <li className="flex items-center space-x-2"><Mail size={16} className="text-nepal-red flex-shrink-0" /><a href="mailto:ceo@narprafood.com" className="hover:text-white transition-colors">ceo@narprafood.com</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-5">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="hover:text-white transition duration-200 p-1"><Facebook size={22} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile" className="hover:text-white transition duration-200 p-1"><Twitter size={22} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="hover:text-white transition duration-200 p-1"><Instagram size={22} /></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} VDumpling Dynasty. All Rights Reserved. Made with ❤️ in India.</p>
            </div>
        </div>
    </footer>
);

export default Footer;

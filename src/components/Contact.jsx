import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { OUTLETS, getMapUrl } from '../data';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            const subject = encodeURIComponent(`Franchisee Enquiry from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
            );
            window.location.href = `mailto:ceo@narprafood.com?subject=${subject}&body=${body}`;
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Get In Touch</h2>
                <div className="flex flex-col md:flex-row gap-10 md:gap-16 bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Franchisee Enquiry</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-nepal-blue focus:border-transparent transition duration-200" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-nepal-blue focus:border-transparent transition duration-200" placeholder="your.email@example.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-nepal-blue focus:border-transparent transition duration-200" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-nepal-red text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5">
                                Send Message
                            </button>
                            <p className="text-xs text-gray-500 text-center">This will open your email client to send the message.</p>
                        </form>
                    </div>

                    <div className="md:w-1/2 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">Contact Details</h3>
                        <div className="space-y-6">
                            {OUTLETS.map((outlet) => (
                                <div key={outlet.id} className={`bg-gray-50 p-4 rounded-md border-l-4 ${
                                    outlet.borderColor === 'nepal-red' ? 'border-nepal-red' :
                                    outlet.borderColor === 'nepal-blue' ? 'border-nepal-blue' :
                                    outlet.borderColor === 'yellow-500' ? 'border-yellow-500' : 'border-emerald-500'
                                }`}>
                                    <h4 className={`font-bold text-gray-800 mb-2 flex items-center ${
                                        outlet.borderColor === 'nepal-red' ? 'text-nepal-red' :
                                        outlet.borderColor === 'nepal-blue' ? 'text-nepal-blue' :
                                        outlet.borderColor === 'yellow-500' ? 'text-yellow-500' : 'text-emerald-500'
                                    }`}>
                                        <MapPin className={`w-5 h-5 mr-2 flex-shrink-0 ${
                                            outlet.borderColor === 'nepal-red' ? 'text-nepal-red' :
                                            outlet.borderColor === 'nepal-blue' ? 'text-nepal-blue' :
                                            outlet.borderColor === 'yellow-500' ? 'text-yellow-500' : 'text-emerald-500'
                                        }`} />
                                        {outlet.name}
                                    </h4>
                                    <a
                                        href={getMapUrl(outlet)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 ml-7 hover:text-nepal-red transition-colors flex items-center gap-2 group"
                                    >
                                        <span>{outlet.address}</span>
                                        <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 flex-shrink-0" />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start space-x-4 mt-6">
                            <Phone className="w-6 h-6 text-nepal-red mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Call Us</h4>
                                <a href="tel:+919040018192" className="text-nepal-blue hover:underline transition duration-200">+91 9040018192</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-nepal-red mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Email Us</h4>
                                <a href="mailto:ceo@narprafood.com" className="text-nepal-blue hover:underline transition duration-200">ceo@narprafood.com</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Clock className="w-6 h-6 text-nepal-red mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                                <p className="text-gray-600">Everyday: 12:00 PM - 10:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

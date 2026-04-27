import React from 'react';
import { X, ChevronDown } from 'lucide-react';

// --- External Website Configuration ---
const OUTLET_WEBSITES = {
    kalinganagar: 'https://vdumplingdynasty.petpooja.com/menu',
    patia: 'https://vddynasty.petpooja.com/menu',
    saheednagar: 'https://vddsaheednagar.petpooja.com/menu',
    cuttack: 'https://vddynasty.petpooja.com/menu',
    default: 'https://vdumplingdynasty.petpooja.com/menu',
};

// --- Helper Functions ---
const redirectToExternalWebsite = (outlet) => {
    const url = OUTLET_WEBSITES[outlet] || OUTLET_WEBSITES.default;
    window.open(url, '_blank', 'noopener,noreferrer');
};

const OutletSelectionModal = ({ isOpen, onClose, onSelectOutlet }) => {
    if (!isOpen) return null;

    const handleOutletSelect = (outlet) => {
        onSelectOutlet(outlet);
        onClose();
        redirectToExternalWebsite(outlet);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                <div className="bg-gradient-to-r from-nepal-red to-red-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Choose Your Outlet</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-red-100 mt-2">Select the outlet you'd like to order from:</p>
                </div>

                <div className="p-6 space-y-4">
                    <button
                        onClick={() => handleOutletSelect('kalinganagar')}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-nepal-red hover:bg-red-50 transition-all duration-200 text-left group"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <img src="/images/logo-circle.png" alt="VDD Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">VDD Kalinganagar</h3>
                                <p className="text-gray-600 text-sm mt-1">Near Anandaban Park</p>
                                <p className="text-gray-500 text-xs mt-1">Bhubaneswar - 751003</p>
                            </div>
                            <div className="text-nepal-red opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronDown className="rotate-[-90deg]" size={20} />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleOutletSelect('patia')}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-nepal-blue hover:bg-blue-50 transition-all duration-200 text-left group"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <img src="/images/logo-circle.png" alt="VDD Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">VDD Patia</h3>
                                <p className="text-gray-600 text-sm mt-1">Galaxia Garden, Infocity</p>
                                <p className="text-gray-500 text-xs mt-1">Patia - 751024</p>
                            </div>
                            <div className="text-nepal-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronDown className="rotate-[-90deg]" size={20} />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleOutletSelect('saheednagar')}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200 text-left group"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <img src="/images/logo-circle.png" alt="VDD Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">VDD Saheed Nagar</h3>
                                <p className="text-gray-600 text-sm mt-1">Near Water Tank</p>
                                <p className="text-gray-500 text-xs mt-1">Bhubaneswar - 751007</p>
                            </div>
                            <div className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronDown className="rotate-[-90deg]" size={20} />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleOutletSelect('cuttack')}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-left group"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <img src="/images/logo-circle.png" alt="VDD Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">VDD Cuttack</h3>
                                <p className="text-gray-600 text-sm mt-1">CDA 9</p>
                                <p className="text-gray-500 text-xs mt-1">Cuttack - 753014</p>
                            </div>
                            <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronDown className="rotate-[-90deg]" size={20} />
                            </div>
                        </div>
                    </button>
                </div>

                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-gray-600 text-sm">
                        You'll be redirected to your selected outlet's ordering page, powered by Petpooja. Payments are processed securely by Cashfree.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OutletSelectionModal;

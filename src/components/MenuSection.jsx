import React from 'react';

const MenuSection = ({ onNavigate, onOpenOutletModal }) => (
    <section id="menu-home" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">What Are You Craving?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Explore our signature momos, flavorful thukpas, and other delicious bites inspired by the streets of Kathmandu.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
                <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-nepal-red">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Dumpling</h3>
                    <p className="text-gray-600">Delicious handcrafted dumplings with various fillings.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-nepal-blue">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Momo</h3>
                    <p className="text-gray-600">Traditional Nepali momos steamed, fried, or in soup.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Dim Sum</h3>
                    <p className="text-gray-600">Authentic dim sum selections with exquisite flavors.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border-b-4 border-green-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Mains And Sides</h3>
                    <p className="text-gray-600">Hearty mains and complementary sides to complete your meal.</p>
                </div>
            </div>
            <div className="text-center mb-16">
                <button
                    onClick={onOpenOutletModal}
                    className="bg-nepal-red text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    See All Dishes
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="md:w-1/2">
                    <img
                        src="/images/menu/jhol-momo-closeup.jpg"
                        alt="Mouth-watering Close-up of Jhol Momos"
                        className="w-full h-80 object-cover border-2 border-white rounded-lg shadow-md"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                            console.error('Image failed to load');
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/800x600/f0f0f0/999999?text=Image+Not+Available";
                        }}
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Explore Every Delicious Detail</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Check out ingredients, spice levels, and find your new favorite dish on our full interactive menu.
                    </p>
                    <div className="text-left border-t border-b border-gray-200 py-4 mb-6 space-y-2">
                        <div className="flex justify-between"><span className="text-gray-700 font-medium">Veg MO:MO</span><span className="font-bold text-nepal-red">₹115</span></div>
                        <div className="flex justify-between"><span className="text-gray-700 font-medium">Garlic Noodles</span><span className="font-bold text-nepal-red">₹155</span></div>
                        <div className="flex justify-between"><span className="text-gray-700 font-medium">Veg Thukpa (Noodle Soup)</span><span className="font-bold text-nepal-red">₹255</span></div>
                    </div>
                    <button
                        onClick={onOpenOutletModal}
                        className="bg-transparent border-2 border-nepal-blue text-nepal-blue px-6 py-2 rounded-full hover:bg-nepal-blue hover:text-white transition duration-300 font-semibold transform hover:-translate-y-0.5">
                        View Full Menu
                    </button>
                </div>
            </div>
        </div>
    </section>
);

export default MenuSection;

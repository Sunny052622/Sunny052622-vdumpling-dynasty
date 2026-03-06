import React from 'react';

const Hero = ({ onNavigate, onOpenOutletModal }) => (
    <section id="home" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-100 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold text-nepal-red mb-4 leading-tight">
                    VDumpling Dynasty
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-nepal-blue mb-6">
                    From Peak to Eat!
                </h2>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    VDumpling Dynasty is a vibrant Quick Service Restaurant (QSR) brand located in India, specializing in authentic Nepalese, Tibetan, and Pan Asian cuisines. Our mission is to bring the rich, diverse flavors of the Himalayas to the urban landscape of India, providing a delightful dining experience that blends tradition with modernity.
                </p>
                <button
                    onClick={onOpenOutletModal}
                    className="bg-nepal-red text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Explore the Menu
                </button>
            </div>
            <div className="md:w-1/2">
                <img
                    src="/images/hero/main-hero.jpg"
                    alt="Vibrant Platter of Assorted Momos"
                    className="w-full h-96 object-cover rounded-xl shadow-xl"
                    loading="eager"
                    fetchPriority="high"
                    width="800"
                    height="600"
                    decoding="async"
                    onError={(e) => {
                        console.error('Image failed to load');
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/800x600/FFE4E1/DC143C?text=Momos";
                    }}
                />
            </div>
        </div>
    </section>
);

export default Hero;

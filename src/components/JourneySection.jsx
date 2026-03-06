import React from 'react';
import ImageCarousel from './ImageCarousel';

const JourneySection = () => {
    // Combine all images into a single array
    const journeyImages = [
        { src: "/images/journey/steaming-process.jpg", alt: "Momos being steamed to perfection" },
        { src: "/images/journey/happy-customers.jpg", alt: "Happy customers enjoying momos" },
        { src: "/images/journey/fresh-dough.jpg", alt: "Freshly prepared momo dough" },
        { src: "/images/journey/restaurant-interior.jpg", alt: "Vibrant interior of VDumpling Dynasty" },
        { src: "/images/journey/momo-platter.jpg", alt: "A platter of delicious momos" },
        { src: "/images/journey/momo-platter1.jpg", alt: "Another delicious platter of assorted momos" },
        { src: "/images/journey/fresh-ingredients.jpg", alt: "Showcase of fresh ingredients" },
        { src: "/images/journey/community-event.jpg", alt: "VDumpling Dynasty at a community event" },
        { src: "/images/journey/chef-preparing.jpg", alt: "Chef preparing momos with passion" }
    ];

    return (
        <section id="about-journey" className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Our Story: From Dream to Dumpling</h2>
                    <h3 className="text-xl font-semibold text-nepal-blue mb-4">Bringing Nepali Flavors to Bhubaneswar</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        It started with a craving for authentic momos! Discover our journey of passion, learning, and sharing the incredible tastes of Nepal right here.
                    </p>
                </div>
                <div className="mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Key Moments</h2>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 rounded-full"></div>
                        <div className="mb-10 flex justify-between items-center w-full">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-10 flex items-center order-1 bg-nepal-red shadow-lg w-8 h-8 rounded-full border-4 border-white"><span className="mx-auto font-bold text-xs text-white">1</span></div>
                            <div className="order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 border-l-4 border-nepal-red">
                                <h3 className="mb-1 font-bold text-gray-800 text-lg">2023 - Idea Sparked</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">All starts with small gathering at home where delicious momos are served.</p>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-between flex-row-reverse items-center w-full">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-10 flex items-center order-1 bg-nepal-blue shadow-lg w-8 h-8 rounded-full border-4 border-white"><span className="mx-auto font-bold text-xs text-white">2</span></div>
                            <div className="order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 border-r-4 border-nepal-blue">
                                <h3 className="mb-1 font-bold text-gray-800 text-lg">2023 - Humble Beginnings</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">Started with a cloud kitchen in a humble beginning.</p>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-between items-center w-full">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-10 flex items-center order-1 bg-nepal-red shadow-lg w-8 h-8 rounded-full border-4 border-white"><span className="mx-auto font-bold text-xs text-white">3</span></div>
                            <div className="order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 border-l-4 border-nepal-red">
                                <h3 className="mb-1 font-bold text-gray-800 text-lg">2023 - First Store</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">Launched our first store, bringing momos directly to the neighborhood.</p>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-between flex-row-reverse items-center w-full">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-10 flex items-center order-1 bg-nepal-blue shadow-lg w-8 h-8 rounded-full border-4 border-white"><span className="mx-auto font-bold text-xs text-white">4</span></div>
                            <div className="order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 border-r-4 border-nepal-blue">
                                <h3 className="mb-1 font-bold text-gray-800 text-lg">2024 - New Shop</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">Expanded our reach and opened a new shop to serve more momo lovers.</p>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-between items-center w-full">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-10 flex items-center order-1 bg-nepal-red shadow-lg w-8 h-8 rounded-full border-4 border-white"><span className="mx-auto font-bold text-xs text-white">5</span></div>
                            <div className="order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 border-l-4 border-nepal-red">
                                <h3 className="mb-1 font-bold text-gray-800 text-lg">2025 - Swiggy Award</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-600">Won the best restaurant award in Swiggy Annual awards. A proud moment!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Replaced the two-column grid with a single, center-aligned section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Journey So Far</h2>
                        <p className="text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            What started in a 90 square feet stall, has reached to several hearts and build a name in this QSR industry. Odisha's first home grown Momo brand and aiming to expand to national and international boundaries.
                        </p>
                    </div>

                    {/* Wider, center-aligned carousel */}
                    <div className="w-full mb-8">
                        <ImageCarousel
                            images={journeyImages}
                            interval={3000}
                            height="xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneySection;

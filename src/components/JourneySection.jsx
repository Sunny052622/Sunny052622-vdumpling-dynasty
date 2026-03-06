import React from 'react';
import ImageCarousel from './ImageCarousel';

const timelineEvents = [
    { year: '2023', title: 'Idea Sparked', description: 'All starts with small gathering at home where delicious momos are served.', color: 'nepal-red' },
    { year: '2023', title: 'Humble Beginnings', description: 'Started with a cloud kitchen in a humble beginning.', color: 'nepal-blue' },
    { year: '2023', title: 'First Store', description: 'Launched our first store, bringing momos directly to the neighborhood.', color: 'nepal-red' },
    { year: '2024', title: 'New Shop', description: 'Expanded our reach and opened a new shop to serve more momo lovers.', color: 'nepal-blue' },
    { year: '2025', title: 'Swiggy Award', description: 'Won the best restaurant award in Swiggy Annual awards. A proud moment!', color: 'nepal-red' },
];

const JourneySection = () => {
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
        <section id="about-journey" className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Our Story: From Dream to Dumpling</h2>
                    <h3 className="text-lg sm:text-xl font-semibold text-nepal-blue mb-4">Bringing Nepali Flavors to Bhubaneswar</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
                        It started with a craving for authentic momos! Discover our journey of passion, learning, and sharing the incredible tastes of Nepal right here.
                    </p>
                </div>

                {/* Timeline */}
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 sm:mb-12 text-center">Key Moments</h2>

                    {/* Mobile Timeline (single column, left-aligned) */}
                    <div className="md:hidden relative max-w-sm mx-auto pl-8">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        {timelineEvents.map((event, i) => (
                            <div key={i} className="mb-8 relative">
                                <div className={`absolute -left-5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center ${
                                    event.color === 'nepal-red' ? 'bg-nepal-red' : 'bg-nepal-blue'
                                }`}>
                                    <span className="text-[8px] font-bold text-white">{i + 1}</span>
                                </div>
                                <div className={`bg-white rounded-lg shadow-md px-4 py-3 border-l-4 ${
                                    event.color === 'nepal-red' ? 'border-nepal-red' : 'border-nepal-blue'
                                }`}>
                                    <h3 className="mb-1 font-bold text-gray-800 text-base">{event.year} - {event.title}</h3>
                                    <p className="text-sm leading-snug text-gray-600">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Timeline (alternating left/right) */}
                    <div className="hidden md:block relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 rounded-full"></div>
                        {timelineEvents.map((event, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div key={i} className={`mb-10 flex justify-between ${isLeft ? '' : 'flex-row-reverse'} items-center w-full`}>
                                    <div className="order-1 w-5/12"></div>
                                    <div className={`z-10 flex items-center order-1 shadow-lg w-8 h-8 rounded-full border-4 border-white ${
                                        event.color === 'nepal-red' ? 'bg-nepal-red' : 'bg-nepal-blue'
                                    }`}>
                                        <span className="mx-auto font-bold text-xs text-white">{i + 1}</span>
                                    </div>
                                    <div className={`order-1 bg-white rounded-lg shadow-md w-5/12 px-6 py-4 ${
                                        isLeft ? 'border-l-4' : 'border-r-4'
                                    } ${event.color === 'nepal-red' ? 'border-nepal-red' : 'border-nepal-blue'}`}>
                                        <h3 className="mb-1 font-bold text-gray-800 text-lg">{event.year} - {event.title}</h3>
                                        <p className="text-sm leading-snug tracking-wide text-gray-600">{event.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Journey Carousel */}
                <div className="max-w-4xl mx-auto mt-10 sm:mt-16">
                    <div className="text-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Journey So Far</h2>
                        <p className="text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
                            What started in a 90 square feet stall, has reached to several hearts and build a name in this QSR industry. Odisha's first home grown Momo brand and aiming to expand to national and international boundaries.
                        </p>
                    </div>
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

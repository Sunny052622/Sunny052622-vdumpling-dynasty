import React from 'react';
import ThemedPlaceholderImage from './ThemedPlaceholderImage';

const AboutSection = ({ title, subtitle, description, imageUrl, videoUrl, imageAlt, reverse = false, onNavigate, variant = 'split' }) => {
    if (variant === 'overlay') {
        return (
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-full object-cover opacity-90"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                    e.target.src = `https://placehold.co/1920x1080/333333/666666?text=${imageAlt.replace(/\s+/g, '+')}`;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/90 via-black/70 to-black/30 sm:to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6 sm:p-10 md:p-20 max-w-2xl text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 font-display tracking-tight">{title}</h2>
                            {subtitle && <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-nepal-red mb-4 sm:mb-6">{subtitle}</h3>}
                            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">{description}</p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavigate) onNavigate('home');
                                    document.getElementById('about-journey')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-block bg-nepal-red text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Discover Our Story
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-10 sm:py-16 ${reverse ? 'bg-gray-100' : 'bg-white'}`}>
            <div className={`container mx-auto px-4 sm:px-6 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 sm:gap-12`}>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">{title}</h2>
                    {subtitle && <h3 className="text-lg sm:text-xl font-semibold text-nepal-blue mb-4">{subtitle}</h3>}
                    <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (onNavigate) onNavigate('home');
                            document.getElementById('about-journey')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-6 bg-transparent border-2 border-nepal-blue text-nepal-blue px-6 py-2 rounded-full hover:bg-nepal-blue hover:text-white transition duration-300 font-semibold transform hover:-translate-y-0.5">
                        Discover Our Story
                    </button>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            poster={imageUrl}
                            className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl shadow-lg"
                            controls
                            autoPlay
                            muted
                            loop
                            preload="metadata"
                            loading="lazy"
                            onError={(e) => {
                                console.error('Video failed to load');
                                e.target.onerror = null;
                                // If video fails, show image as fallback
                                e.target.style.display = 'none';
                                const imgFallback = document.createElement('img');
                                imgFallback.src = imageUrl || `https://placehold.co/800x600/f0f0f0/999999?text=${imageAlt.replace(/\s+/g, '+')}`;
                                imgFallback.alt = imageAlt;
                                imgFallback.className = "w-full h-80 object-cover rounded-xl shadow-lg";
                                e.target.parentNode.appendChild(imgFallback);
                            }}
                        />
                    ) : imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl shadow-lg"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                                console.error('Image failed to load');
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/800x600/f0f0f0/999999?text=${imageAlt.replace(/\s+/g, '+')}`;
                            }}
                        />
                    ) : (
                        <ThemedPlaceholderImage height="80" text={imageAlt} className="shadow-lg rounded-xl" />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AnnouncementPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show only once per session
        if (!sessionStorage.getItem('vdd_award_popup_seen')) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('vdd_award_popup_seen', 'true');
    };

    const handleReadMore = () => {
        sessionStorage.setItem('vdd_award_popup_seen', 'true');
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Award Announcement"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Award Image */}
                <div className="relative">
                    <img
                        src="/images/blog/blog-7-award.jpg"
                        alt="VDumpling Dynasty founders Lipsa Satapathy and Tamasa Mishra win Swiggy Entrepreneur of the Year Award"
                        className="w-full h-56 sm:h-64 object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                        <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                            NATIONAL AWARD
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2">
                        Two Odia Sisters Beat 70,000+ Businesses to Win Swiggy's Entrepreneur Award!
                    </h3>
                    <p className="text-sm text-gray-600 mb-5">
                        Our founders Lipsa Satapathy & Tamasa Mishra have been named among India's Top 28 Women Entrepreneurs — bringing pride to Odisha this Women's Day.
                    </p>

                    {/* Read More Button */}
                    <a
                        href="https://www.prameyanews.com/two-odia-girls-from-bhubaneswar-beat-70000-business-players-to-clinch-swiggys-national-entrepreneur-of-the-year-award"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleReadMore}
                        className="block w-full bg-nepal-red hover:bg-red-700 text-white text-center font-semibold py-3 rounded-xl transition-colors shadow-sm"
                    >
                        Read Full Story →
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default AnnouncementPopup;

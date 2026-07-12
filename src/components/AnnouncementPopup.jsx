import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Award, ArrowRight, ExternalLink } from 'lucide-react';

const FOUNDER_STORY_URL = 'https://www.prameyanews.com/two-odia-girls-from-bhubaneswar-beat-70000-business-players-to-clinch-swiggys-national-entrepreneur-of-the-year-award';

// First-visit award reveal — Swiggy Restaurant Awards, Best in Momo,
// Bhubaneswar, two consecutive years ('25 & '26). Shows once per visitor.
const AnnouncementPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('vdd_award_popup_2526_seen')) {
            const timer = setTimeout(() => setIsVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    // Close on Escape
    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e) => e.key === 'Escape' && handleClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('vdd_award_popup_2526_seen', 'true');
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-ink/85 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fadeIn"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Swiggy Restaurant Awards — Best in Momo, Bhubaneswar, 2025 and 2026"
        >
            <div
                className="relative max-w-sm w-full rounded-3xl overflow-hidden bg-midnight border border-white/15 shadow-[0_40px_120px_rgba(220,20,60,0.25)] animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: '#0A1633' }}
            >
                {/* Close */}
                <button
                    onClick={handleClose}
                    className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all"
                    aria-label="Close"
                >
                    <X size={17} />
                </button>

                {/* Golden medallion header */}
                <div className="relative pt-10 pb-6 px-6 text-center overflow-hidden grain">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(245,166,35,0.35),transparent_60%)]" aria-hidden="true" />
                    <span className="absolute -left-6 -bottom-14 font-accent text-[9rem] text-white/[0.05] select-none" aria-hidden="true">म:</span>

                    {/* Medal */}
                    <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-lantern via-[#F5E6A3] to-[#B8860B] flex items-center justify-center shadow-[0_10px_40px_rgba(245,166,35,0.45)] float-soft">
                        <Award size={36} className="text-ink" />
                    </div>

                    <p className="relative mt-5 text-lantern font-bold tracking-mega uppercase text-[10px]">
                        Swiggy National Restaurant Awards
                    </p>
                    <h2 className="relative font-display font-extrabold text-white text-3xl leading-tight mt-2">
                        Best in <span className="text-transparent bg-clip-text bg-gradient-to-r from-lantern via-[#F5E6A3] to-lantern">Momo</span>
                    </h2>
                    <p className="relative text-white/70 text-sm font-semibold mt-1">Bhubaneswar</p>

                    {/* Year chips */}
                    <div className="relative mt-4 flex items-center justify-center gap-2">
                        <span className="rounded-full border border-lantern/40 bg-lantern/10 text-lantern text-xs font-extrabold px-4 py-1.5">2025</span>
                        <span className="text-white/40 text-xs font-bold">×</span>
                        <span className="rounded-full border border-lantern/40 bg-lantern/10 text-lantern text-xs font-extrabold px-4 py-1.5">2026</span>
                    </div>
                    <p className="relative text-white/50 text-xs mt-2.5 font-medium">Two years running. Zero plans of stopping.</p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 space-y-3">
                    <Link
                        to="/menu"
                        onClick={handleClose}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-crimson text-white font-bold py-3.5 hover:bg-crimson-deep active:scale-[0.98] transition-all"
                    >
                        Taste the award-winner <ArrowRight size={16} />
                    </Link>
                    <a
                        href={FOUNDER_STORY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold transition-colors"
                    >
                        Read the founders' story in the press <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9) translateY(24px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
            `}</style>
        </div>
    );
};

export default AnnouncementPopup;

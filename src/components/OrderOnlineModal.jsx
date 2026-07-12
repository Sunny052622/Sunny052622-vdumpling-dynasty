import React, { useEffect } from 'react';
import { X, MapPin, ChevronRight, Info } from 'lucide-react';
import { OUTLETS } from '../data/outlets';

// Site-wide "Order Online" picker — choose an outlet, jump to its Petpooja
// online menu (same destinations as the Scan & Order page).
const OrderOnlineModal = ({ isOpen, onClose }) => {
    // Lock body scroll while open
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Order online — choose your outlet"
        >
            <div
                className="w-full sm:max-w-md bg-midnight border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-crimson relative px-6 py-5 grain overflow-hidden">
                    <span className="absolute -right-3 -bottom-8 font-accent text-[6rem] text-white/10 select-none" aria-hidden="true">म:</span>
                    <div className="relative flex items-start justify-between gap-3">
                        <div>
                            <h2 className="font-display font-extrabold text-white text-2xl leading-tight">Order Online</h2>
                            <p className="text-white/80 text-sm mt-1">Pick your outlet — order for pickup or delivery</p>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white active:scale-95 transition-all flex-shrink-0"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Outlets */}
                <div className="p-4 space-y-2.5 max-h-[55vh] overflow-y-auto">
                    {OUTLETS.filter((o) => !o.comingSoon && o.orderUrl).map((o) => (
                        <a
                            key={o.id}
                            href={o.orderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-crimson/50 p-4 transition-all active:scale-[0.99]"
                        >
                            <span className="w-10 h-10 rounded-xl bg-crimson/15 text-crimson flex items-center justify-center flex-shrink-0 group-hover:bg-crimson group-hover:text-white transition-colors">
                                <MapPin size={17} />
                            </span>
                            <span className="flex-1 min-w-0">
                                <span className="block font-display font-bold text-white">{o.name.replace('VDD ', '')}</span>
                                <span className="block text-white/50 text-xs truncate mt-0.5">{o.shortAddress}</span>
                            </span>
                            <ChevronRight size={17} className="text-white/30 group-hover:text-crimson group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </a>
                    ))}
                </div>

                {/* Loyalty note */}
                <div className="px-5 pb-5">
                    <p className="flex items-start gap-2 text-[11px] leading-relaxed text-lantern/90 bg-lantern/10 border border-lantern/20 rounded-xl px-3.5 py-2.5">
                        <Info size={13} className="flex-shrink-0 mt-0.5" />
                        <span>Loyalty points don't apply on online orders — they're earned only on in-store (POS) billing.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderOnlineModal;

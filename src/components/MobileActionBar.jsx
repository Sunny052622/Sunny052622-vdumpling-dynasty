import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Phone, MapPin } from 'lucide-react';

// Thumb-reach action bar — most customers arrive on mobile.
const MobileActionBar = () => {
    const { pathname } = useLocation();

    return (
        <div
            className="fixed bottom-0 inset-x-0 z-40 md:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="mx-3 mb-3 rounded-2xl bg-midnight/90 backdrop-blur-lg border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.55)] grid grid-cols-3 overflow-hidden">
                <Link
                    to="/menu"
                    className={`flex flex-col items-center gap-1 py-3 active:bg-white/5 transition-colors ${
                        pathname === '/menu' ? 'text-crimson' : 'text-white/80'
                    }`}
                >
                    <UtensilsCrossed size={19} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Menu</span>
                </Link>
                <a
                    href="tel:+919040018192"
                    className="flex flex-col items-center gap-1 py-3 text-white bg-crimson active:bg-crimson-deep transition-colors"
                >
                    <Phone size={19} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Call &amp; Order</span>
                </a>
                <Link
                    to="/contact"
                    className={`flex flex-col items-center gap-1 py-3 active:bg-white/5 transition-colors ${
                        pathname === '/contact' ? 'text-crimson' : 'text-white/80'
                    }`}
                >
                    <MapPin size={19} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Outlets</span>
                </Link>
            </div>
        </div>
    );
};

export default MobileActionBar;

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { X, Menu, Phone, Instagram, Facebook } from 'lucide-react';
import OrderOnlineModal from './OrderOnlineModal';
import { ELITE_ENABLED } from '../config/features';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/', label: 'Elite', scrollTo: 'elite-card' },
    { to: '/blog', label: 'Stories' },
    { to: '/contact', label: 'Outlets' },
].filter((l) => ELITE_ENABLED || l.label !== 'Elite');

const Header = ({ onOpenOutletModal }) => {
    const [open, setOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => { setOpen(false); }, [location.pathname]);

    // Solid header after slight scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll while the menu overlay is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-ink/90 backdrop-blur-md border-b border-white/10 py-2.5'
                        : 'bg-gradient-to-b from-ink/80 to-transparent py-4'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
                    <Link to="/" className="flex items-center gap-2.5 group" aria-label="VDumpling Dynasty — home">
                        <img
                            src="/images/logo-circle.png"
                            alt=""
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-white/20 group-hover:ring-crimson transition-all duration-300"
                        />
                        <span className="leading-none">
                            <span className="block font-display font-extrabold text-white text-[15px] sm:text-base tracking-wide">
                                VDUMPLING <span className="text-crimson">DYNASTY</span>
                            </span>
                            <span className="block text-[10px] sm:text-[11px] text-white/50 tracking-mega font-medium mt-1 uppercase">
                                From Peak to Eat
                            </span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((l) => (
                            l.scrollTo ? (
                                <Link
                                    key={l.label}
                                    to={l.to}
                                    state={{ scrollTo: l.scrollTo }}
                                    className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 text-white/70 hover:text-white hover:bg-white/5"
                                >
                                    {l.label}
                                </Link>
                            ) : (
                                <NavLink
                                    key={l.label}
                                    to={l.to}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                            isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            )
                        ))}
                        <button
                            onClick={() => setOrderOpen(true)}
                            className="ml-3 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-bold tracking-wide hover:bg-crimson-deep transition-colors duration-200 pulse-glow"
                        >
                            Order Online
                        </button>
                    </div>

                    {/* Mobile toggles */}
                    <div className="flex md:hidden items-center gap-2">
                        <a
                            href="tel:+919040018192"
                            aria-label="Call VDumpling Dynasty"
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
                        >
                            <Phone size={17} />
                        </a>
                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center text-white active:scale-95 transition-transform"
                        >
                            <Menu size={19} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full-screen mobile menu */}
            <div
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!open}
            >
                <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
                {/* Decorative Devanagari watermark */}
                <span className="absolute -right-6 top-1/3 font-accent text-[38vh] leading-none text-white/[0.04] pointer-events-none select-none">
                    म:
                </span>

                <div className="relative h-full flex flex-col px-7 pt-6 pb-10">
                    <div className="flex items-center justify-between">
                        <img src="/images/logo-circle.png" alt="VDumpling Dynasty" className="w-11 h-11 rounded-full" />
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="mt-14 flex flex-col gap-2">
                        {NAV_LINKS.map((l, i) => (
                            l.scrollTo ? (
                                <Link
                                    key={l.label}
                                    to={l.to}
                                    state={{ scrollTo: l.scrollTo }}
                                    onClick={() => setOpen(false)}
                                    style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                                    className={`font-display font-extrabold text-[13vw] leading-[1.12] tracking-tight transition-all duration-500 text-white ${
                                        open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    {l.label} <span className="text-lantern text-[6vw] align-middle font-bold uppercase tracking-widest">10% off</span>
                                </Link>
                            ) : (
                                <NavLink
                                    key={l.label}
                                    to={l.to}
                                    onClick={() => setOpen(false)}
                                    style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                                    className={({ isActive }) =>
                                        `font-display font-extrabold text-[13vw] leading-[1.12] tracking-tight transition-all duration-500 ${
                                            open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                        } ${isActive ? 'text-crimson' : 'text-white'}`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            )
                        ))}
                    </nav>

                    <div
                        className={`mt-auto transition-all duration-500 delay-300 ${
                            open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                        }`}
                    >
                        <button
                            onClick={() => { setOpen(false); setOrderOpen(true); }}
                            className="block w-full text-center py-4 rounded-2xl bg-crimson text-white font-bold text-lg active:scale-[0.98] transition-transform"
                        >
                            Order Online · Pickup or Delivery
                        </button>
                        <div className="mt-6 flex items-center justify-between text-white/50 text-sm">
                            <a href="tel:+919040018192" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Phone size={15} /> +91 90400 18192
                            </a>
                            <span className="flex items-center gap-4">
                                <a href="https://www.instagram.com/vdumplingdynasty/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={18} /></a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={18} /></a>
                            </span>
                        </div>
                        <p className="mt-5 text-[11px] tracking-mega uppercase text-white/30">
                            Bhubaneswar · Cuttack — Est. 2023
                        </p>
                    </div>
                </div>
            </div>

            <OrderOnlineModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
        </>
    );
};

export default Header;

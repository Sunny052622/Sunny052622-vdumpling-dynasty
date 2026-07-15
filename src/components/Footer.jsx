import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import { OUTLETS, getMapUrl } from '../data';

const Footer = () => (
    <footer className="relative bg-ink text-white/60 overflow-hidden pb-24 md:pb-10">
        {/* Prayer flag bunting */}
        <div className="bunting w-full" aria-hidden="true">
            {Array.from({ length: 80 }).map((_, i) => <i key={i} />)}
        </div>

        {/* Giant watermark wordmark */}
        <div className="pointer-events-none select-none absolute -bottom-6 left-0 right-0 overflow-hidden" aria-hidden="true">
            <p className="font-display font-extrabold whitespace-nowrap text-[18vw] leading-none text-outline text-center">
                MO:MO DYNASTY
            </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/images/logo-circle.png" alt="VDumpling Dynasty logo" className="w-12 h-12 rounded-full" />
                        <div className="leading-tight">
                            <p className="font-display font-extrabold text-white">VDUMPLING <span className="text-crimson">DYNASTY</span></p>
                            <p className="text-[10px] tracking-mega uppercase text-white/40 mt-0.5">From Peak to Eat</p>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Odisha's first home-grown Mo:Mo brand — Mo:Mo, dim sum, wok-tossed noodles
                        &amp; Pan-Asian mains, made fresh daily since 2023.
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                        <a href="https://www.instagram.com/vdumplingdynasty/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                           className="w-10 h-10 rounded-full bg-white/5 hover:bg-crimson flex items-center justify-center text-white transition-colors duration-300">
                            <Instagram size={17} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                           className="w-10 h-10 rounded-full bg-white/5 hover:bg-crimson flex items-center justify-center text-white transition-colors duration-300">
                            <Facebook size={17} />
                        </a>
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-white font-bold text-sm tracking-mega uppercase mb-4">Explore</h3>
                    <ul className="space-y-2.5 text-sm">
                        <li><Link to="/menu" className="hover:text-white transition-colors">Full Menu</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Mo:Mo Stories</Link></li>
                        <li><Link to="/" state={{ scrollTo: 'elite-card' }} className="hover:text-white transition-colors">VDD Elite Card</Link></li>
                        <li><Link to="/scan-and-order" className="hover:text-white transition-colors">Scan &amp; Order</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Franchise</Link></li>
                    </ul>
                </div>

                {/* Outlets */}
                <div>
                    <h3 className="text-white font-bold text-sm tracking-mega uppercase mb-4">Outlets</h3>
                    <ul className="space-y-3 text-sm">
                        {OUTLETS.map((o) => (
                            <li key={o.id}>
                                {o.comingSoon ? (
                                    <span className="flex items-start gap-2 text-white/35 cursor-default">
                                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                                        <span>
                                            {o.name.replace('VDD ', '')}
                                            <span className="ml-2 rounded-full bg-lantern/20 text-lantern text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 align-middle">Soon</span>
                                        </span>
                                    </span>
                                ) : (
                                    <a
                                        href={getMapUrl(o)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-2 hover:text-white transition-colors"
                                    >
                                        <MapPin size={14} className="text-crimson mt-0.5 flex-shrink-0" />
                                        <span>
                                            {o.name.replace('VDD ', '')}
                                            <ArrowUpRight size={11} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold text-sm tracking-mega uppercase mb-4">Talk to us</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="tel:+919040018192" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Phone size={14} className="text-crimson flex-shrink-0" /> +91 90400 18192
                            </a>
                        </li>
                        <li>
                            <a href="mailto:ceo@narprafood.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail size={14} className="text-crimson flex-shrink-0" /> ceo@narprafood.com
                            </a>
                        </li>
                    </ul>
                    <p className="mt-5 text-xs leading-relaxed text-white/40">
                        Franchise enquiries welcome — help us take the Dynasty national.
                    </p>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
                <p>© {new Date().getFullYear()} Narpra Foods · VDumpling Dynasty. All rights reserved.</p>
                <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="/refund" className="hover:text-white transition-colors">Refunds</Link>
                    <Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link>
                </nav>
            </div>
        </div>
    </footer>
);

export default Footer;

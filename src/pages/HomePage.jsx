import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowDown, Award, MapPin, Phone, Flame, Snowflake,
    CookingPot, Soup, Instagram, ChevronRight, Sparkles, Mail,
    Newspaper, ExternalLink, CreditCard, PiggyBank,
} from 'lucide-react';
import { useReveal, useCountUp } from '../hooks/useReveal';
import { OUTLETS, getMapUrl } from '../data';
import {
    CARD_FEE, formatCurrency, getMultiplierMessage,
    calculateSavings, calculateSIPFutureValue,
} from '../utils/calculatorUtils';

const FOUNDER_STORY_URL = 'https://www.prameyanews.com/two-odia-girls-from-bhubaneswar-beat-70000-business-players-to-clinch-swiggys-national-entrepreneur-of-the-year-award';

/* Image that walks a fallback chain: your uploaded photo → legacy photo → styled pattern */
const SmartImage = ({ sources = [], alt, className, fallback }) => {
    const [idx, setIdx] = useState(0);
    if (idx >= sources.length) return fallback || null;
    return (
        <img
            src={sources[idx]}
            alt={alt}
            loading="lazy"
            className={className}
            onError={() => setIdx((i) => i + 1)}
        />
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   HERO — night-market stall energy: video, steam, giant type
──────────────────────────────────────────────────────────────────────────── */
const Hero = () => (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-ink grain">
        {/* Video backdrop */}
        <video
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src="/videos/about/momo-making-process.mp4"
            poster="/images/hero/main-hero.jpg"
            autoPlay muted loop playsInline
            aria-hidden="true"
        />
        {/* Colour wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-midnight/40 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,20,60,0.28),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,56,147,0.35),transparent_60%)]" />

        {/* Steam wisps */}
        <div className="absolute inset-x-0 bottom-0 h-[70vh] pointer-events-none" aria-hidden="true">
            <span className="steam left-[12%] w-16 h-16" style={{ '--dur': '8s', '--delay': '0s', '--drift': '30px' }} />
            <span className="steam left-[28%] w-24 h-24" style={{ '--dur': '10s', '--delay': '2.2s', '--drift': '-40px' }} />
            <span className="steam left-[55%] w-14 h-14" style={{ '--dur': '7s', '--delay': '1s', '--drift': '22px' }} />
            <span className="steam left-[74%] w-20 h-20" style={{ '--dur': '9s', '--delay': '3.4s', '--drift': '-26px' }} />
            <span className="steam left-[88%] w-12 h-12" style={{ '--dur': '6.5s', '--delay': '0.6s', '--drift': '18px' }} />
        </div>

        {/* Floating momo sticker */}
        <div className="absolute right-[6%] top-[15%] float-soft" aria-hidden="true">
            <img
                src="/images/momo.png"
                alt=""
                className="w-20 sm:w-28 lg:w-32 rounded-full ring-4 ring-crimson/50 shadow-[0_20px_50px_rgba(220,20,60,0.35)] rotate-6"
            />
        </div>

        {/* Giant Devanagari watermark */}
        <span
            className="absolute -left-4 top-[8%] font-accent text-[34vw] sm:text-[22vw] leading-none text-white/[0.05] pointer-events-none select-none"
            aria-hidden="true"
        >
            म:म:
        </span>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-28 sm:pb-24 pt-36">
            {/* Award pill — 2 years running */}
            <div className="rise-in inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 pl-1.5 pr-4 py-1.5 mb-6" style={{ '--d': '0.15s' }}>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-lantern text-ink">
                    <Award size={14} />
                </span>
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide">
                    Swiggy Awards '25 &amp; '26 — Best in Momo, 2 years running
                </span>
            </div>

            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight text-[15.5vw] sm:text-[11vw] lg:text-[8.5rem]">
                <span className="block rise-in" style={{ '--d': '0.25s' }}>FROM PEAK</span>
                <span className="block rise-in text-transparent bg-clip-text bg-gradient-to-r from-crimson via-[#FF5470] to-lantern" style={{ '--d': '0.4s' }}>
                    TO EAT<span className="text-white">.</span>
                </span>
            </h1>

            <p className="rise-in mt-6 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed" style={{ '--d': '0.55s' }}>
                Odisha's first home-grown Mo:Mo brand. Nepalese Mo:Mo, dim sum, wok-tossed
                noodles, fried rice &amp; sizzling starters — hand-folded and flame-tossed in
                Bhubaneswar &amp; Cuttack, every single day.
            </p>

            <div className="rise-in mt-9 flex flex-col sm:flex-row gap-3 sm:items-center" style={{ '--d': '0.7s' }}>
                <Link
                    to="/menu"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-crimson text-white font-bold px-8 py-4 text-base hover:bg-crimson-deep active:scale-[0.98] transition-all pulse-glow"
                >
                    Explore the Menu
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                    href="#story"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white/90 font-semibold px-8 py-4 text-base hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                    Our Story
                    <ArrowDown size={17} className="bounce-soft" />
                </a>
            </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40" aria-hidden="true">
            <span className="text-[10px] tracking-mega uppercase">Scroll</span>
            <span className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
    </section>
);

/* ────────────────────────────────────────────────────────────────────────────
   MARQUEE — crimson craving ticker
──────────────────────────────────────────────────────────────────────────── */
const TICKER = ['STEAMED', 'JHOL', 'DIM SUM', 'KOTHEY', 'NOODLES', 'SADEKHO', 'FRIED RICE', 'TEEKHO', 'WONTON', 'LAPHING', 'CHILLI CHICKEN', 'THUKPA', 'SHA-PHALEY'];

const Ticker = () => (
    <div className="relative bg-crimson py-3.5 sm:py-4 overflow-hidden marquee-paused -rotate-1 scale-[1.02] z-20 shadow-[0_10px_50px_rgba(220,20,60,0.4)]">
        <div className="marquee-track" style={{ '--speed': '26s' }}>
            {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center flex-shrink-0" aria-hidden={copy === 1}>
                    {TICKER.map((word) => (
                        <span key={`${copy}-${word}`} className="flex items-center">
                            <span className="px-5 font-display font-extrabold text-white text-lg sm:text-2xl tracking-wide">{word}</span>
                            <span className="text-white/60 font-accent text-xl" aria-hidden="true">म:</span>
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

/* ────────────────────────────────────────────────────────────────────────────
   SIGNATURE DISHES — horizontal snap cards, real menu items & prices
──────────────────────────────────────────────────────────────────────────── */
// Each dish looks for your photo in /public/images/dishes/<file> first,
// then falls back to an older photo, then to a styled pattern card.
// Mix mirrors the real business: Mo:Mo & dim sum PLUS wok mains, starters & Tibetan classics.
const SIGNATURES = [
    { name: 'Jhol Mo:Mo', tag: 'Steamed', icon: Soup, desc: 'Steamed Mo:Mo drowned in a thin pahadi jhol of tomato & sesame.', price: 115, veg: true, unit: '5 pcs', imgs: ['/images/dishes/jhol-momo.jpg', '/images/blog/blog-1-momo.jpg'] },
    { name: 'Sadekho Mo:Mo', tag: 'Hand-mixed', icon: Flame, desc: 'Fried Mo:Mo tossed by hand in spicy, tangy Nepalese masala.', price: 105, veg: true, unit: '5 pcs', imgs: ['/images/dishes/sadekho-momo.jpg', '/images/blog/blog-2-sadeko.jpg'] },
    { name: 'Garlic Noodles', tag: 'Wok-tossed', icon: CookingPot, desc: 'Thin noodles wok-tossed with butter, garlic & red chilli flakes.', price: 155, veg: true, imgs: ['/images/dishes/garlic-noodles.jpg', '/images/blog/blog-3-thukpa.jpg'] },
    { name: 'Prawns Dumpling', tag: 'Dim sum', icon: Soup, desc: 'Delicate fresh prawns with celery & sesame oil, topped with chilli oil.', price: 185, veg: false, unit: '5 pcs', imgs: ['/images/dishes/prawn-dumpling.jpg'] },
    { name: 'Chilli Chicken', tag: 'Starter', icon: Flame, desc: 'Chicken stir-fried with bell pepper, onion, garlic & in-house sauces.', price: 225, veg: false, imgs: ['/images/dishes/chilli-chicken.jpg'] },
    { name: 'Chicken Thukpa', tag: 'Noodle soup', icon: Soup, desc: 'Tibetan noodle soup with vegetables, chicken & a poached egg.', price: 265, veg: false, imgs: ['/images/dishes/chicken-thukpa.jpg'] },
    { name: 'Laphing', tag: 'Served cold', icon: Snowflake, desc: 'Cold-wrapped Tibetan classic with chilli oil & crushed Wai Wai.', price: 85, veg: true, imgs: ['/images/dishes/laphing.jpg'] },
];

const DishCard = ({ dish, index }) => {
    const Icon = dish.icon;
    return (
        <article className="tilt-card relative flex-shrink-0 w-[72vw] xs:w-[300px] sm:w-[320px] rounded-3xl overflow-hidden bg-midnight-2 border border-white/10 rv" style={{ '--rv-delay': `${index * 0.08}s`, backgroundColor: '#0E1E45' }}>
            <div className="relative h-44 overflow-hidden">
                <SmartImage
                    sources={dish.imgs}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    fallback={
                        <div className="relative h-44 flex items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(220,20,60,0.4),transparent_70%)]">
                            <span className="font-accent text-8xl text-white/10 select-none" aria-hidden="true">म:</span>
                            <Icon size={44} className="absolute text-crimson" />
                        </div>
                    }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E45] to-transparent pointer-events-none" />
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0 ${dish.veg ? 'border-green-500' : 'border-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dish.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                    </span>
                    <span className="text-[10px] font-bold tracking-mega uppercase text-lantern">{dish.tag}</span>
                </div>
                <h3 className="font-display font-extrabold text-white text-xl leading-tight">{dish.name}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed min-h-[3.75rem]">{dish.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="font-display font-extrabold text-2xl text-white">₹{dish.price}{dish.unit && <span className="text-white/40 text-xs font-semibold ml-1">/ {dish.unit}*</span>}</span>
                    <span className="font-display font-extrabold text-4xl text-outline select-none" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </article>
    );
};

const Signatures = () => {
    const ref = useReveal();
    const rowRef = React.useRef(null);
    const nudged = React.useRef(false);
    const [active, setActive] = useState(0);
    const cardCount = SIGNATURES.length + 1; // dishes + "Hungry for more?" card

    // Track which card is in view (mobile dots)
    const onRowScroll = (e) => {
        const row = e.currentTarget;
        const card = row.querySelector('article');
        if (!card) return;
        const step = card.getBoundingClientRect().width + 16; // card + gap
        setActive(Math.min(cardCount - 1, Math.round(row.scrollLeft / step)));
    };

    // One-time gentle nudge when the row first scrolls into view (mobile only)
    React.useEffect(() => {
        const row = rowRef.current;
        if (!row) return;
        if (window.innerWidth >= 640) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || nudged.current) return;
            nudged.current = true;
            io.disconnect();
            setTimeout(() => {
                row.scrollTo({ left: 90, behavior: 'smooth' });
                setTimeout(() => row.scrollTo({ left: 0, behavior: 'smooth' }), 500);
            }, 500);
        }, { threshold: 0.5 });
        io.observe(row);
        return () => io.disconnect();
    }, []);

    const jumpToCard = (i) => {
        const row = rowRef.current || document.querySelector('.snap-row');
        const card = row?.querySelector('article');
        if (!row || !card) return;
        const step = card.getBoundingClientRect().width + 16;
        // Instant assignment — smooth scrollTo() is unreliably cancelled on
        // mandatory-snap containers when a re-render lands mid-animation.
        row.scrollLeft = i * step;
        setActive(i);
    };

    return (
        <section ref={ref} className="relative bg-ink py-20 sm:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <p className="rv text-crimson font-bold tracking-mega uppercase text-xs mb-3">What are you craving?</p>
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <h2 className="rv font-display font-extrabold text-white text-4xl sm:text-6xl leading-[1.02] tracking-tight max-w-xl" style={{ '--rv-delay': '0.1s' }}>
                        From the steamer<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern">&amp; the wok.</span>
                    </h2>
                    <Link to="/menu" className="rv group hidden sm:inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors" style={{ '--rv-delay': '0.2s' }}>
                        All 130+ dishes
                        <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-crimson group-hover:border-crimson transition-all">
                            <ArrowRight size={15} />
                        </span>
                    </Link>
                </div>
                {/* Swipe hint — mobile only */}
                <p className="rv sm:hidden mt-4 flex items-center gap-2 text-white/50 text-xs font-semibold tracking-widest uppercase" style={{ '--rv-delay': '0.25s' }}>
                    Swipe to explore <ArrowRight size={13} className="animate-pulse" />
                </p>
            </div>

            <div
                ref={rowRef}
                onScroll={onRowScroll}
                className="snap-row mt-10 sm:mt-14 flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-2"
            >
                {SIGNATURES.map((d, i) => <DishCard key={d.name} dish={d} index={i} />)}
                {/* End card → menu */}
                <Link
                    to="/menu"
                    className="tilt-card relative flex-shrink-0 w-[72vw] xs:w-[300px] sm:w-[320px] rounded-3xl overflow-hidden bg-crimson flex flex-col items-center justify-center text-center p-8 rv"
                    style={{ '--rv-delay': '0.5s' }}
                >
                    <span className="font-accent text-[10rem] leading-none text-white/20 absolute -top-6 -right-4 select-none" aria-hidden="true">म:</span>
                    <p className="font-display font-extrabold text-white text-3xl leading-tight relative">Hungry<br />for more?</p>
                    <p className="text-white/80 text-sm mt-3 relative">Mo:Mo, dim sum, noodles, fried rice, starters, soups &amp; more.</p>
                    <span className="relative mt-6 inline-flex items-center gap-2 bg-white text-crimson font-bold rounded-full px-6 py-3">
                        Full Menu <ArrowRight size={16} />
                    </span>
                </Link>
            </div>
            {/* Dot indicators — mobile only */}
            <div className="sm:hidden mt-5 flex justify-center gap-2" role="tablist" aria-label="Dish cards">
                {Array.from({ length: cardCount }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => jumpToCard(i)}
                        aria-label={`Go to card ${i + 1}`}
                        aria-current={active === i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            active === i ? 'w-6 bg-crimson' : 'w-2 bg-white/25'
                        }`}
                    />
                ))}
            </div>

            {/* Squad line — the 4-people reality */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-8">
                <p className="rv rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white/80 text-sm sm:text-base leading-relaxed" style={{ '--rv-delay': '0.2s' }}>
                    <span className="font-bold text-lantern">Rolling in as four?</span> Mo:Mo for two, garlic
                    noodles &amp; chilli chicken for the rest, a thukpa to share — everyone leaves happy.
                </p>
                <p className="mt-3 text-white/30 text-xs">*Veg-version prices shown where variants exist; see the full menu.</p>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   STATS — the numbers that built the dynasty
──────────────────────────────────────────────────────────────────────────── */
const Stat = ({ end, suffix, label, delay }) => {
    const [ref, value] = useCountUp(end);
    return (
        <div ref={ref} className="rv text-center px-2" style={{ '--rv-delay': delay }}>
            <p className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight">
                {value.toLocaleString('en-IN')}{suffix}
            </p>
            <p className="mt-1.5 text-[11px] sm:text-xs font-bold tracking-mega uppercase text-ink/50">{label}</p>
        </div>
    );
};

const Stats = () => {
    const ref = useReveal();
    return (
        <section ref={ref} className="relative bg-rice py-14 sm:py-20">
            <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
                <Stat end={90} suffix=" ft²" label="Where it all began" delay="0s" />
                <Stat end={4} suffix="" label="Outlets & growing" delay="0.1s" />
                <Stat end={70000} suffix="+" label="Brands outshone · Swiggy '25" delay="0.2s" />
                <Stat end={130} suffix="+" label="Dishes on the menu" delay="0.3s" />
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   STORY — from a 90 sq-ft stall to a dynasty
──────────────────────────────────────────────────────────────────────────── */
const MILESTONES = [
    { year: '2023', title: 'Idea sparked', text: 'A home gathering, a plate of Mo:Mo, and a dream is folded.' },
    { year: '2023', title: 'Cloud kitchen', text: 'Humble beginnings — orders roll out of a tiny cloud kitchen.' },
    { year: '2023', title: 'First stall', text: 'A 90 sq-ft street stall opens. The neighbourhood queues up.' },
    { year: '2024', title: 'New outlets', text: 'Infocity, Saheed Nagar, Cuttack — the Dynasty expands.' },
    { year: '2025', title: 'Swiggy Award', text: '"Best in Momo, Bhubaneswar" — and top-28 women-led brand in India among 70,000+ in Swiggy\'s She The Change.' },
    { year: '2026', title: 'Back-to-back champions', text: '"Best in Momo, Bhubaneswar" again — two consecutive years at the top.' },
];

const Story = () => {
    const ref = useReveal();
    return (
        <section id="story" ref={ref} className="relative bg-rice overflow-hidden py-20 sm:py-28">
            {/* Watercolor backdrop, soft */}
            <img
                src="/images/about/nepal-bhubaneswar-map.jpg"
                alt=""
                aria-hidden="true"
                className="absolute top-0 right-0 w-[60%] sm:w-[42%] opacity-[0.14] pointer-events-none select-none"
                style={{ maskImage: 'linear-gradient(to bottom left, black, transparent 75%)', WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 75%)' }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <p className="rv text-crimson font-bold tracking-mega uppercase text-xs mb-3">Our journey</p>
                <h2 className="rv font-display font-extrabold text-ink text-4xl sm:text-6xl leading-[1.02] tracking-tight max-w-2xl" style={{ '--rv-delay': '0.1s' }}>
                    A 90 sq-ft stall.<br />Two sisters. <span className="text-crimson">One dynasty.</span>
                </h2>
                <p className="rv mt-5 max-w-2xl text-ink/60 text-base sm:text-lg leading-relaxed" style={{ '--rv-delay': '0.2s' }}>
                    Founded by <strong className="text-ink">Lipsa Satapathy</strong> and <strong className="text-ink">Tamasa Mishra</strong>,
                    VDumpling Dynasty started with a craving for real Nepali Mo:Mo — and grew into Odisha's
                    first home-grown Mo:Mo brand, now aiming for national and international borders.
                </p>

                <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* How it started / going + award */}
                    <div className="space-y-6">
                        <figure className="rv rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(6,11,29,0.18)] border border-ink/5 bg-white" style={{ '--rv-delay': '0.15s' }}>
                            <img src="/images/journey/momo-platter.jpg" alt="How it started — a shuttered stall — versus how it's going — a glowing VDumpling Dynasty outlet" loading="lazy" className="w-full" />
                        </figure>
                        <figure className="rv rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(6,11,29,0.18)] border border-ink/5 bg-white" style={{ '--rv-delay': '0.25s' }}>
                            <img src="/images/journey/fresh-ingredients.jpg" alt="Swiggy Restaurant Awards certificate — V Dumpling Dynasty, Best in Momo, Bhubaneswar, winner in 2025 and 2026" loading="lazy" className="w-full" />
                        </figure>

                        {/* Press — the founders' national award story */}
                        <a
                            href={FOUNDER_STORY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rv tilt-card group block rounded-3xl bg-ink text-white p-6 sm:p-7 relative overflow-hidden"
                            style={{ '--rv-delay': '0.35s' }}
                        >
                            <span className="absolute -right-4 -bottom-8 font-accent text-[7rem] text-white/[0.06] select-none" aria-hidden="true">म:</span>
                            <p className="flex items-center gap-2 text-lantern font-bold tracking-mega uppercase text-[11px] mb-3">
                                <Newspaper size={13} /> In the news · Prameya News
                            </p>
                            <h3 className="font-display font-extrabold text-lg sm:text-xl leading-snug">
                                Two Odia girls from Bhubaneswar beat 70,000 business players to clinch
                                Swiggy's National Entrepreneur of the Year Award
                            </h3>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-crimson font-bold text-sm group-hover:gap-2.5 transition-all">
                                Read the full story <ExternalLink size={14} />
                            </span>
                        </a>
                    </div>

                    {/* Timeline */}
                    <ol className="relative pl-8 space-y-9">
                        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-crimson via-royal to-lantern" aria-hidden="true" />
                        {MILESTONES.map((m, i) => (
                            <li key={i} className="rv relative" style={{ '--rv-delay': `${0.1 + i * 0.1}s` }}>
                                <span className={`absolute -left-8 top-1 w-[19px] h-[19px] rounded-full border-4 border-rice ${i === MILESTONES.length - 1 ? 'bg-lantern' : 'bg-crimson'}`} aria-hidden="true" />
                                <p className="font-display font-extrabold text-crimson text-sm tracking-mega">{m.year}</p>
                                <h3 className="font-display font-extrabold text-ink text-xl sm:text-2xl mt-0.5">{m.title}</h3>
                                <p className="text-ink/60 mt-1.5 leading-relaxed text-[15px]">{m.text}</p>
                            </li>
                        ))}
                        <li className="rv relative" style={{ '--rv-delay': '0.65s' }}>
                            <span className="absolute -left-8 top-1 w-[19px] h-[19px] rounded-full border-4 border-rice bg-royal" aria-hidden="true" />
                            <p className="font-display font-extrabold text-royal text-sm tracking-mega">NEXT</p>
                            <h3 className="font-display font-extrabold text-ink text-xl sm:text-2xl mt-0.5">Your city?</h3>
                            <p className="text-ink/60 mt-1.5 leading-relaxed text-[15px]">
                                Franchise enquiries are open — <a href="mailto:ceo@narprafood.com" className="text-crimson font-semibold underline decoration-2 underline-offset-2">write to us</a>.
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   DYNASTY MONKS — brand mascots & their momo wisdom
──────────────────────────────────────────────────────────────────────────── */
// Drop each monk's artwork into /public/images/monks/ with these filenames —
// the cards use it automatically (emoji shows until the file exists).
const MONKS = [
    { name: 'VDDVirtue', img: '/images/monks/vddvirtue.png', quote: 'Hands convey love to Mo:Mo — let them be your true utensils!', mood: '🙏' },
    { name: 'VDDJester', img: '/images/monks/vddjester.png', quote: 'Beware! We declare mayo a mere illusion for true Mo:Mo lovers!', mood: '😄' },
    { name: 'VDDSauceSage', img: '/images/monks/vddsaucesage.png', quote: 'In the dynasty of VDD, safeguard your Mo:Mo — sharing is not always caring!', mood: '🌶️' },
    { name: 'VDDSoloshen', img: '/images/monks/vddsoloshen.png', quote: 'Ever seen a Mo:Mo do a somersault? Neither have we — but your taste buds will!', mood: '🤸' },
    { name: 'VDDCleanse', img: '/images/monks/vddcleanse.png', quote: "Life's messy, but your Mo:Mo plate (and character) shouldn't be!", mood: '✨' },
];

const MonkCard = ({ m, className = '', style }) => (
    <blockquote className={`rounded-3xl border border-white/10 bg-white/[0.045] backdrop-blur-sm p-6 ${className}`} style={style}>
        <div className="flex items-center gap-3 mb-3">
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-crimson to-royal flex items-center justify-center text-xl overflow-hidden flex-shrink-0" aria-hidden="true">
                <SmartImage
                    sources={[m.img]}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                    fallback={<span>{m.mood}</span>}
                />
            </span>
            <cite className="not-italic font-display font-extrabold text-white tracking-wide">{m.name}</cite>
        </div>
        <p className="text-white/70 leading-relaxed text-[15px]">“{m.quote}”</p>
    </blockquote>
);

const Monks = () => {
    const ref = useReveal();
    const [idx, setIdx] = useState(0);
    const carouselRef = React.useRef(null);
    const inViewRef = React.useRef(false);
    const pausedUntil = React.useRef(0);
    const touchX = React.useRef(null);

    // Auto-advance the mobile carousel while it's on screen
    React.useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => { inViewRef.current = e.isIntersecting; }, { threshold: 0.3 });
        io.observe(el);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return () => io.disconnect();
        }
        const timer = setInterval(() => {
            if (!inViewRef.current || Date.now() < pausedUntil.current) return;
            setIdx((i) => (i + 1) % MONKS.length);
        }, 3200);
        return () => { io.disconnect(); clearInterval(timer); };
    }, []);

    // Swipe support — pauses autoplay briefly so it doesn't fight the user
    const onTouchStart = (e) => {
        pausedUntil.current = Date.now() + 7000;
        touchX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) {
            setIdx((i) => (i + (dx < 0 ? 1 : -1) + MONKS.length) % MONKS.length);
        }
    };

    const pick = (i) => {
        pausedUntil.current = Date.now() + 7000;
        setIdx(i);
    };

    return (
        <section ref={ref} className="relative bg-ink py-20 sm:py-28 overflow-hidden grain">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,56,147,0.35),transparent_55%)]" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-2 min-w-0">
                        <p className="rv text-lantern font-bold tracking-mega uppercase text-xs mb-3">Meet the mascots</p>
                        <h2 className="rv font-display font-extrabold text-white text-4xl sm:text-6xl leading-[1.02] tracking-tight" style={{ '--rv-delay': '0.1s' }}>
                            The Dynasty<br /><span className="text-crimson">Monks.</span>
                        </h2>
                        <p className="rv mt-5 text-white/60 leading-relaxed" style={{ '--rv-delay': '0.2s' }}>
                            Five little monks guard the Dynasty — each with a life lesson learnt
                            over a steaming plate of Mo:Mo. Spot them at every outlet.
                        </p>
                        <figure className="rv mt-8 rounded-3xl overflow-hidden border border-white/10" style={{ '--rv-delay': '0.3s' }}>
                            <SmartImage
                                sources={['/images/monks/monks-banner.jpg', '/images/menu/jhol-momo-closeup.jpg']}
                                alt="The Dynasty Monks hard at work in the kitchen"
                                className="w-full"
                            />
                        </figure>
                    </div>

                    <div className="lg:col-span-3 min-w-0">
                        {/* Mobile — auto-playing carousel (one card tall instead of five) */}
                        <div ref={carouselRef} className="rv sm:hidden" style={{ '--rv-delay': '0.15s' }}>
                            <div
                                className="overflow-hidden"
                                onTouchStart={onTouchStart}
                                onTouchEnd={onTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-700"
                                    style={{ transform: `translateX(-${idx * 100}%)`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                                >
                                    {MONKS.map((m, i) => (
                                        <div key={m.name} className="w-full flex-shrink-0" aria-hidden={idx !== i}>
                                            <MonkCard m={m} className="min-h-[168px]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Dots */}
                            <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Dynasty Monks">
                                {MONKS.map((m, i) => (
                                    <button
                                        key={m.name}
                                        onClick={() => pick(i)}
                                        aria-label={m.name}
                                        aria-current={idx === i}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            idx === i ? 'w-6 bg-crimson' : 'w-2 bg-white/25'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop / tablet — full grid */}
                        <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                            {MONKS.map((m, i) => (
                                <MonkCard
                                    key={m.name}
                                    m={m}
                                    className={`rv tilt-card ${i === 4 ? 'sm:col-span-2' : ''}`}
                                    style={{ '--rv-delay': `${0.15 + i * 0.08}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   COMMUNITY — #VDDIANS
──────────────────────────────────────────────────────────────────────────── */
const Community = () => {
    const ref = useReveal();
    return (
        <section ref={ref} className="relative bg-ink pb-20 sm:pb-28">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="rv relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-royal via-midnight-2 to-ink border border-white/10 p-7 sm:p-12" style={{ backgroundColor: '#0E1E45' }}>
                    <span className="absolute -right-8 -top-10 font-accent text-[12rem] text-white/[0.06] select-none" aria-hidden="true">म:</span>
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lantern font-bold tracking-mega uppercase text-xs mb-3 flex items-center gap-2"><Sparkles size={13} /> The family</p>
                            <h2 className="font-display font-extrabold text-white text-3xl sm:text-5xl leading-[1.05] tracking-tight">
                                Join the <span className="text-crimson">#VDDians.</span>
                            </h2>
                            <p className="mt-4 text-white/60 leading-relaxed max-w-md">
                                Thousands of Mo:Mo lovers, one dynasty. Tag <strong className="text-white">#VDDians</strong> on
                                your next plate and become part of the wall.
                            </p>
                            <a
                                href="https://instagram.com"
                                target="_blank" rel="noopener noreferrer"
                                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white text-ink font-bold px-7 py-3.5 hover:bg-lantern transition-colors active:scale-[0.98]"
                            >
                                <Instagram size={18} /> Follow the Dynasty
                            </a>
                        </div>
                        <figure className="rounded-2xl overflow-hidden border border-white/10 rotate-1">
                            <img src="/images/journey/chef-preparing.jpg" alt="Collage of #VDDians — happy customers at VDumpling Dynasty outlets" loading="lazy" className="w-full" />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   VDD ELITE CARD — full savings projection, same math & layout as the
   original VIP calculator (calculateSavings / SIP / multiplier message).
──────────────────────────────────────────────────────────────────────────── */
// TODO: paste the card purchase link here when ready (Cashfree / payment page).
const BUY_CARD_URL = '';

/* The physical Elite card — 3D pointer tilt, floating idle, shine sweep, glow */
const EliteCardVisual = () => {
    const stageRef = React.useRef(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const onMove = (e) => {
        const r = stageRef.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: -py * 12, ry: px * 16 });
    };

    return (
        <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
            className="rv max-w-md"
            style={{ perspective: '1100px' }}
        >
            <div className="elite-float">
                <div
                    className="elite-glow elite-card-3d ring-1 ring-white/15"
                    style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
                >
                    <img
                        src="/images/ELITECARD.jpg"
                        alt="VDDian Member Elite card — VDumpling Dynasty"
                        loading="lazy"
                    />
                    <span className="elite-shine" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

const EliteCalculator = () => {
    const ref = useReveal();
    const [visits, setVisits] = useState(8);
    const [orderValue, setOrderValue] = useState(300);

    const { yearlySpend, grossSavings, netSavings, multiplier } = calculateSavings(visits, orderValue);
    const sip = calculateSIPFutureValue(netSavings);
    const isPositive = netSavings > 0;

    return (
        <section id="elite-card" ref={ref} className="relative bg-ink py-20 sm:py-28 overflow-hidden grain">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,20,60,0.22),transparent_55%)]" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    <div className="lg:sticky lg:top-28">
                        <EliteCardVisual />
                        <p className="rv text-lantern font-bold tracking-mega uppercase text-xs mb-3 mt-8 flex items-center gap-2" style={{ '--rv-delay': '0.05s' }}>
                            <CreditCard size={13} /> VDD Elite Card
                        </p>
                        <h2 className="rv font-display font-extrabold text-white text-4xl sm:text-6xl leading-[1.02] tracking-tight" style={{ '--rv-delay': '0.1s' }}>
                            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern">Elite.</span><br />
                            Mo:Mo pays you back.
                        </h2>
                        <p className="rv mt-5 text-white/60 leading-relaxed max-w-md" style={{ '--rv-delay': '0.2s' }}>
                            Flat <strong className="text-white">10% off every order</strong> — Mo:Mo, dim sum,
                            noodles, rice, starters, all of it. Slide your Mo:Mo habit and watch your yearly
                            projection update live — no forms, no waiting.
                        </p>
                        <ul className="rv mt-6 space-y-3 text-white/90 text-[15px] font-medium" style={{ '--rv-delay': '0.3s' }}>
                            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-crimson flex-shrink-0" /> One-time fee of {formatCurrency(CARD_FEE)} — valid at every outlet</li>
                            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-lantern flex-shrink-0" /> Flat 10% discount on all your orders</li>
                            <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-royal-lite flex-shrink-0" /> Ready for pickup at your outlet — no shipping</li>
                        </ul>
                    </div>

                    {/* Live calculator — mirrors the original VIP calculator results */}
                    <div className="rv rounded-[2rem] bg-white/[0.05] backdrop-blur-sm border border-white/10 p-6 sm:p-8" style={{ '--rv-delay': '0.2s' }}>
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2.5">
                                    <label htmlFor="elite-visits" className="text-white/70 text-sm font-semibold">Monthly visits</label>
                                    <span className="rounded-lg bg-crimson/20 px-3 py-1 font-display font-extrabold text-crimson text-lg">
                                        {visits}<span className="text-crimson/60 text-xs font-semibold ml-1">times/mo</span>
                                    </span>
                                </div>
                                <input
                                    id="elite-visits" type="range" min="1" max="30" value={visits}
                                    onChange={(e) => setVisits(+e.target.value)}
                                    className="w-full accent-crimson h-2 cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-white/30 mt-1.5 font-semibold px-0.5">
                                    <span>1</span><span>15</span><span>30</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2.5">
                                    <label htmlFor="elite-order" className="text-white/70 text-sm font-semibold">Average order value</label>
                                    <span className="rounded-lg bg-lantern/20 px-3 py-1 font-display font-extrabold text-lantern text-lg">
                                        {formatCurrency(orderValue)}
                                    </span>
                                </div>
                                <input
                                    id="elite-order" type="range" min="100" max="1500" step="25" value={orderValue}
                                    onChange={(e) => setOrderValue(+e.target.value)}
                                    className="w-full accent-lantern h-2 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* ── Yearly projection (same structure as the VIP calculator) ── */}
                        <h3 className="text-white/70 text-[11px] font-bold tracking-mega uppercase mt-8 mb-4">
                            Your yearly projection
                        </h3>

                        <div className="space-y-3.5">
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-[15px]">Estimated total spend</span>
                                <span className="font-bold text-white">{formatCurrency(yearlySpend)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-[15px]">10% card discount</span>
                                <span className="font-bold text-emerald-300">+{formatCurrency(grossSavings)}</span>
                            </div>

                            {/* One-time card fee breakup */}
                            <div className="rounded-xl bg-white/[0.08] border border-white/20 p-4">
                                <p className="text-[11px] font-bold text-lantern uppercase tracking-widest mb-2.5">One-time card fee breakup</p>
                                <div className="space-y-1.5 text-[15px]">
                                    <div className="flex justify-between"><span className="text-white/90">Card fee</span><span className="text-white font-semibold">₹427.97</span></div>
                                    <div className="flex justify-between"><span className="text-white/90">GST (18%)</span><span className="text-white font-semibold">₹77.03 <span className="text-white/60 text-xs">(≈ ₹77)</span></span></div>
                                    <div className="pt-1.5 border-t border-dashed border-white/25 flex justify-between">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="font-bold text-[#FF6B87]">−{formatCurrency(CARD_FEE)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Net savings */}
                            <div className={`rounded-2xl p-5 border transition-colors duration-300 ${isPositive ? 'bg-crimson/10 border-crimson/30' : 'bg-white/[0.04] border-white/10'}`}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-semibold text-white/75">Your net savings</span>
                                    {isPositive && (
                                        <span className="bg-gradient-to-r from-lantern to-orange-500 text-ink text-xs font-extrabold px-3 py-1 rounded-full">
                                            {multiplier.toFixed(1)}X
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className={`font-display font-extrabold text-4xl tracking-tight ${isPositive ? 'text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern' : 'text-white/70'}`}>
                                        {formatCurrency(netSavings)}
                                    </span>
                                    <span className="text-white/40 text-sm font-medium mb-1.5">/ year</span>
                                </div>
                                <p className={`text-sm mt-2 font-medium ${isPositive ? 'text-white/75' : 'text-white/50'}`}>
                                    {isPositive
                                        ? getMultiplierMessage(multiplier)
                                        : 'Visit a little more often and the card pays for itself.'}
                                </p>
                            </div>

                            {/* Invest-it bonus (same rule as the calculator: SIP line at ≥₹600/mo) */}
                            {isPositive && sip.monthlySavings >= 600 && (
                                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 flex items-start gap-3">
                                    <span className="text-xl" aria-hidden="true">📈</span>
                                    <p className="text-sm text-white/90 leading-relaxed">
                                        <strong className="text-white">Invest it:</strong> a ₹{Math.round(sip.monthlySavings).toLocaleString('en-IN')}/mo
                                        SIP (est. 12% p.a.) could grow to <strong className="text-lantern">{formatCurrency(sip.futureValue)}</strong> in 1 year!
                                    </p>
                                </div>
                            )}

                            {/* Buy card */}
                            <a
                                href={BUY_CARD_URL || '#elite-card'}
                                target={BUY_CARD_URL ? '_blank' : undefined}
                                rel={BUY_CARD_URL ? 'noopener noreferrer' : undefined}
                                onClick={BUY_CARD_URL ? undefined : (e) => e.preventDefault()}
                                aria-disabled={!BUY_CARD_URL}
                                className={`mt-1 w-full inline-flex items-center justify-center gap-2 rounded-full font-bold px-8 py-4 transition-all active:scale-[0.98] ${
                                    isPositive
                                        ? 'bg-crimson text-white hover:bg-crimson-deep pulse-glow'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                }`}
                            >
                                <PiggyBank size={18} /> Buy the Elite Card — {formatCurrency(CARD_FEE)}
                            </a>
                            <p className="text-center text-white/60 text-xs">
                                Available at every outlet counter — online purchase coming soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   OUTLETS — find your nearest steamer
──────────────────────────────────────────────────────────────────────────── */
const Outlets = () => {
    const ref = useReveal();
    return (
        <section id="outlets" ref={ref} className="relative bg-rice py-20 sm:py-28 overflow-hidden">
            <div className="bunting absolute top-0 left-0 w-full" aria-hidden="true">
                {Array.from({ length: 80 }).map((_, i) => <i key={i} />)}
            </div>
            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-4">
                <p className="rv text-crimson font-bold tracking-mega uppercase text-xs mb-3">Four steamers live — a fifth on the way</p>
                <h2 className="rv font-display font-extrabold text-ink text-4xl sm:text-6xl leading-[1.02] tracking-tight" style={{ '--rv-delay': '0.1s' }}>
                    Find your <span className="text-crimson">nearest Mo:Mo.</span>
                </h2>

                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {OUTLETS.map((o, i) => (
                        o.comingSoon ? (
                            <div
                                key={o.id}
                                className="rv relative rounded-3xl bg-white/60 border-2 border-dashed border-crimson/30 p-6 flex flex-col"
                                style={{ '--rv-delay': `${0.1 + i * 0.08}s` }}
                                aria-disabled="true"
                            >
                                <span className="absolute top-4 right-4 rounded-full bg-lantern text-ink text-[10px] font-extrabold tracking-widest uppercase px-3 py-1">
                                    Opening Soon
                                </span>
                                <span className="w-11 h-11 rounded-2xl bg-ink/5 text-ink/40 flex items-center justify-center mb-4">
                                    <MapPin size={19} />
                                </span>
                                <h3 className="font-display font-extrabold text-ink/70 text-lg">{o.name.replace('VDD ', '')}</h3>
                                <p className="text-ink/50 text-sm mt-1.5 leading-relaxed flex-1">{o.shortAddress}</p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-ink/40 font-bold text-sm">
                                    The steamers arrive shortly 🥟
                                </span>
                            </div>
                        ) : (
                            <a
                                key={o.id}
                                href={getMapUrl(o)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rv tilt-card group rounded-3xl bg-white border border-ink/8 p-6 shadow-[0_10px_40px_rgba(6,11,29,0.08)] flex flex-col"
                                style={{ '--rv-delay': `${0.1 + i * 0.08}s` }}
                            >
                                <span className="w-11 h-11 rounded-2xl bg-crimson/10 text-crimson flex items-center justify-center mb-4 group-hover:bg-crimson group-hover:text-white transition-colors">
                                    <MapPin size={19} />
                                </span>
                                <h3 className="font-display font-extrabold text-ink text-lg">{o.name.replace('VDD ', '')}</h3>
                                <p className="text-ink/60 text-sm mt-1.5 leading-relaxed flex-1">{o.shortAddress}</p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-crimson font-bold text-sm">
                                    Get directions <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        )
                    ))}
                </div>

                <div className="rv mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ '--rv-delay': '0.4s' }}>
                    <a href="tel:+919040018192" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white font-bold px-7 py-4 hover:bg-royal transition-colors active:scale-[0.98]">
                        <Phone size={17} /> Call &amp; Order — +91 90400 18192
                    </a>
                    <p className="text-ink/50 text-sm sm:ml-2">Also on Swiggy — search “VDumpling Dynasty”.</p>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   FRANCHISE CTA
──────────────────────────────────────────────────────────────────────────── */
const Franchise = () => {
    const ref = useReveal();
    return (
        <section ref={ref} className="relative bg-crimson overflow-hidden grain">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,56,147,0.5),transparent_60%)]" aria-hidden="true" />
            <span className="absolute -left-10 -bottom-16 font-accent text-[16rem] text-white/10 select-none" aria-hidden="true">म:म:</span>
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center">
                <h2 className="rv font-display font-extrabold text-white text-4xl sm:text-6xl leading-[1.02] tracking-tight">
                    Bring the Dynasty<br />to your city.
                </h2>
                <p className="rv mt-4 text-white/80 max-w-lg mx-auto leading-relaxed" style={{ '--rv-delay': '0.1s' }}>
                    From one 90 sq-ft stall to an award-winning brand — the next chapter could be yours.
                    Franchise with VDumpling Dynasty.
                </p>
                <div className="rv mt-8 flex flex-col sm:flex-row justify-center gap-3" style={{ '--rv-delay': '0.2s' }}>
                    <a href="mailto:ceo@narprafood.com?subject=Franchise%20Enquiry%20—%20VDumpling%20Dynasty" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-crimson font-bold px-8 py-4 hover:bg-rice transition-colors active:scale-[0.98]">
                        <Mail size={17} /> Franchise Enquiry
                    </a>
                    <a href="tel:+919040018192" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-8 py-4 hover:bg-white/10 transition-colors active:scale-[0.98]">
                        <Phone size={17} /> Talk to the Founders
                    </a>
                </div>
            </div>
        </section>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────────────── */
const HomePage = () => (
    <>
        <Helmet>
            <title>VDumpling Dynasty | Mo:Mo, Dim Sum & Pan-Asian Kitchen — Bhubaneswar & Cuttack</title>
            <meta
                name="description"
                content="Odisha's first home-grown Mo:Mo brand. Authentic Nepalese momos, dim sum, wok-tossed noodles, fried rice, thukpa & starters — 130+ dishes across Bhubaneswar & Cuttack. Swiggy Best in Momo '25 & '26."
            />
            <link rel="canonical" href="https://narprafoods.com/" />
        </Helmet>
        <main className="bg-ink">
            <Hero />
            <Ticker />
            <Signatures />
            <Stats />
            <Story />
            <Monks />
            <Community />
            <EliteCalculator />
            <Outlets />
            <Franchise />
        </main>
    </>
);

export default HomePage;

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { OUTLETS } from '../data/outlets';

// ─── LAUNCH DATE — change this to go live ───────────────────────────────────
// Set to midnight IST on April 6 2026. Once this date passes, the countdown
// disappears automatically and the real page shows.
const LAUNCH_DATE = new Date('2026-04-06T00:00:00+05:30');
// ────────────────────────────────────────────────────────────────────────────

// Countdown hook
function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
      done: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [target]);
  return time;
}

// Countdown tile
const Tile = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black text-white tabular-nums"
      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mt-2">{label}</span>
  </div>
);

// Coming soon screen
const ComingSoon = ({ countdown }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)' }}
  >
    {/* Logo */}
    <img src="/images/logo-circle.png" alt="VDumpling Dynasty" className="w-14 h-14 mb-6 opacity-90" />

    {/* Teaser copy */}
    <p className="text-[11px] font-bold text-nepal-red uppercase tracking-[0.3em] mb-3">Something hot is coming</p>
    <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">
      Scan & Order
    </h1>
    <p className="text-white/40 text-sm mb-10 max-w-xs leading-relaxed">
      Your table, your order — skip the queue and order straight from your phone.
      <br />We're almost ready.
    </p>

    {/* Countdown */}
    <div className="flex items-start gap-3 sm:gap-4 mb-10">
      <Tile value={countdown.days}    label="Days"    />
      <span className="text-white/20 text-3xl font-black mt-3">:</span>
      <Tile value={countdown.hours}   label="Hours"   />
      <span className="text-white/20 text-3xl font-black mt-3">:</span>
      <Tile value={countdown.minutes} label="Mins"    />
      <span className="text-white/20 text-3xl font-black mt-3">:</span>
      <Tile value={countdown.seconds} label="Secs"    />
    </div>

    {/* Fun nudge */}
    <div
      className="rounded-2xl px-6 py-4 max-w-xs border border-white/10 text-sm text-white/50 leading-relaxed"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      While you wait — ask your server for today's specials.
      The momos are <span className="text-nepal-red font-semibold">very much</span> live right now.
    </div>

    <p className="text-white/20 text-[10px] mt-8 tracking-widest uppercase">VDumpling Dynasty</p>
  </div>
);

// --- Real menu items ---
const ALL_ITEMS = [
  'Garlic Noodles',
  'Teekho Mo:Mo',
  'Jhol Mo:Mo',
  'Thukpa',
  'Himalayan Mo:Mo',
  'Lemon Coriander',
  '7-Spice Herbed Potato',
  'Chicken Hot Wings',
  'Chicken Lollipop',
  'Butter Garlic Chicken',
  'Fried Rice',
  'Sha Phaley',
  'Rice Paper Dumplings',
  'Shumai',
  'Siti Mo:Mo',
  'Fried Wonton',
  'Laphing',
];

// Seeded shuffle — same order all day, new order tomorrow
function hashDate(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = (s >>> 0) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const OUTLET_WEBSITES = {
  kalinganagar: 'https://vdumplingdynasty.petpooja.com/menu',
  patia: 'https://vddynasty.petpooja.com/menu',
  saheednagar: 'https://vddsaheednagar.petpooja.com/menu',
  cuttack: 'https://vddynasty.petpooja.com/menu',
};

const OUTLET_COLORS = {
  kalinganagar: { hover: 'hover:bg-red-50', text: 'text-nepal-red' },
  patia: { hover: 'hover:bg-blue-50', text: 'text-nepal-blue' },
  saheednagar: { hover: 'hover:bg-yellow-50', text: 'text-yellow-500' },
  cuttack: { hover: 'hover:bg-emerald-50', text: 'text-emerald-500' },
};

// --- Single cycling name ---
const CyclingName = ({ items, intervalMs, className }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length);
        setVisible(true);
      }, 400);
    }, intervalMs);
    return () => clearInterval(tick);
  }, [items, intervalMs]);

  return (
    <span
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        display: 'block',
      }}
    >
      {items[index]}
    </span>
  );
};

// --- Outlet overlay ---
const OutletOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleSelect = (id) => {
    window.open(OUTLET_WEBSITES[id] || OUTLET_WEBSITES.kalinganagar, '_blank', 'noopener,noreferrer');
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-nepal-red to-red-600 text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Choose Your Outlet</h2>
            <p className="text-red-100 text-sm mt-0.5">Select where you'd like to order from</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1" aria-label="Close"><X size={22} /></button>
        </div>
        <div className="p-4 space-y-3">
          {OUTLETS.map(outlet => {
            const c = OUTLET_COLORS[outlet.id] || OUTLET_COLORS.kalinganagar;
            return (
              <button key={outlet.id} onClick={() => handleSelect(outlet.id)}
                className={`w-full p-4 border-2 border-gray-200 rounded-xl ${c.hover} transition-all duration-200 text-left group flex items-center gap-3`}>
                <img src="/images/logo-circle.png" alt="VDD" className="w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{outlet.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{outlet.shortAddress}</p>
                </div>
                <ChevronRight className={`w-5 h-5 ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </button>
            );
          })}
        </div>
        <div className="bg-gray-50 px-4 py-3 text-center">
          <p className="text-gray-500 text-xs">You'll be redirected to our online menu for ordering</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
const ScanAndOrderPage = () => {
  const [outletOpen, setOutletOpen] = useState(false);
  const countdown = useCountdown(LAUNCH_DATE);

  // Shuffle items daily, then split into 3 offset lists for staggered cycling
  const [list1, list2, list3] = React.useMemo(() => {
    const seed = hashDate(new Date().toDateString());
    const shuffled = seededShuffle(ALL_ITEMS, seed);
    const third = Math.ceil(shuffled.length / 3);
    return [
      shuffled.slice(0, third),
      shuffled.slice(third, third * 2),
      shuffled.slice(third * 2),
    ];
  }, []);

  // Show coming soon until launch date passes
  if (!countdown.done) {
    return (
      <>
        <Helmet>
          <title>Coming Soon | VDumpling Dynasty</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <ComingSoon countdown={countdown} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>What's Trending | VDumpling Dynasty</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-lg mx-auto px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/images/logo-circle.png" alt="VDumpling Dynasty" className="w-9 h-9" />
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">VDumpling Dynasty</p>
                <p className="text-[10px] text-gray-400 mt-0.5 tracking-wide">What's on today</p>
              </div>
            </div>
            <button
              onClick={() => setOutletOpen(true)}
              className="bg-nepal-red text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-red-700 transition-colors active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5" />
              Order Online
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-lg mx-auto w-full px-5 py-8 pb-28">

          {/* Live indicator */}
          <div className="flex items-center gap-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nepal-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nepal-red"></span>
            </span>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Live today</p>
          </div>

          {/* Three labelled slots */}
          <div className="divide-y divide-gray-100">

            {/* Slot 1 — Most Ordered */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-nepal-red uppercase tracking-widest">Most Ordered</span>
                <span className="text-[10px] text-gray-300">↑</span>
              </div>
              <CyclingName
                items={list1}
                intervalMs={3200}
                className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight"
              />
            </div>

            {/* Slot 2 — Trending Now */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Trending Now</span>
                <span className="text-[10px] text-gray-300">↗</span>
              </div>
              <CyclingName
                items={list2}
                intervalMs={2700}
                className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight"
              />
            </div>

            {/* Slot 3 — Crowd's Pick */}
            <div className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-nepal-blue uppercase tracking-widest">Crowd's Pick</span>
                <span className="text-[10px] text-gray-300">★</span>
              </div>
              <CyclingName
                items={list3}
                intervalMs={3800}
                className="text-xl sm:text-2xl font-semibold text-gray-600 leading-tight"
              />
            </div>

          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" />
            <p className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">& much more</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="text-center text-[10px] text-gray-300 mt-3 tracking-wide">
            Updates daily at midnight
          </p>
        </main>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div className="max-w-lg mx-auto px-5 py-3">
            <button
              onClick={() => setOutletOpen(true)}
              className="w-full bg-nepal-red text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-[15px] hover:bg-red-700 transition-colors active:scale-[0.98] shadow-lg shadow-red-100"
            >
              <MapPin className="w-[18px] h-[18px]" />
              Order Online
            </button>
          </div>
        </div>

        <OutletOverlay isOpen={outletOpen} onClose={() => setOutletOpen(false)} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ScanAndOrderPage;

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flame, ChefHat, Star, Sparkles, MapPin, ChevronRight, X, TrendingUp, Award } from 'lucide-react';
import { getDailyMenu } from '../data/scanMenuItems';
import { OUTLETS } from '../data/outlets';

// --- Outlet URLs (same as OutletSelectionModal) ---
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

// --- Veg/Non-Veg Indicator ---
const VegIndicator = ({ isVeg }) => (
  <span
    className={`w-3.5 h-3.5 flex-shrink-0 rounded-[2px] border-2 flex items-center justify-center ${
      isVeg ? 'border-green-600' : 'border-red-600'
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
  </span>
);

// --- Animated Popularity Bar ---
const PopularityBar = ({ popularity, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(popularity), 150 + delay);
    return () => clearTimeout(timer);
  }, [popularity, delay]);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-nepal-red" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Popularity</span>
        </div>
        <span className="text-xs font-bold text-nepal-red">{popularity}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #DC143C 0%, #ff4757 50%, #ff6b81 100%)',
          }}
        />
      </div>
    </div>
  );
};

// --- Trending Card ---
const TrendingCard = ({ item, index }) => (
  <div
    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 animate-fadeInUp"
    style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
  >
    <div className="flex items-center gap-2 mb-2">
      <VegIndicator isVeg={item.isVeg} />
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.category}</span>
      {item.popularity >= 90 && (
        <span className="ml-auto text-[9px] font-bold text-nepal-red bg-red-50 px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wide">
          Bestseller
        </span>
      )}
    </div>

    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-[15px] leading-tight">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="text-base font-bold text-gray-900">&#8377;{item.price}</span>
      </div>
    </div>

    <PopularityBar popularity={item.popularity} delay={index * 60} />
  </div>
);

// --- Chef's Glass Card ---
const ChefCard = ({ item, index }) => (
  <div
    className="relative overflow-hidden rounded-2xl p-5 border border-white/20 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 group animate-fadeInUp"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      animationDelay: `${index * 80}ms`,
      animationFillMode: 'both',
    }}
  >
    {/* Animated decorative glow */}
    <div
      className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-15 group-hover:opacity-25 transition-all duration-700 group-hover:scale-110"
      style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }}
    />

    <div className="relative z-10">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <VegIndicator isVeg={item.isVeg} />
            <span className="text-[10px] font-semibold text-amber-300/80 uppercase tracking-widest">{item.category}</span>
          </div>
          <h3 className="font-bold text-white text-base leading-tight">{item.name}</h3>
        </div>
        <Award className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-300/90 leading-relaxed mb-4">{item.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-lg font-bold text-white">&#8377;{item.price}</span>
        <span className="text-[10px] bg-amber-400/15 text-amber-300 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide border border-amber-400/25">
          Chef's Pick
        </span>
      </div>
    </div>
  </div>
);

// --- Outlet Selection Overlay ---
const OutletOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSelect = (outletId) => {
    const url = OUTLET_WEBSITES[outletId] || OUTLET_WEBSITES.kalinganagar;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-nepal-red to-red-600 text-white p-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Choose Your Outlet</h2>
              <p className="text-red-100 text-sm mt-1">Select where you'd like to order from</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Close">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {OUTLETS.map((outlet) => {
            const colors = OUTLET_COLORS[outlet.id] || OUTLET_COLORS.kalinganagar;
            return (
              <button
                key={outlet.id}
                onClick={() => handleSelect(outlet.id)}
                className={`w-full p-4 border-2 border-gray-200 rounded-xl ${colors.hover} transition-all duration-200 text-left group flex items-center gap-3`}
              >
                <div className="w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <img src="/images/logo-circle.png" alt="VDD" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{outlet.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{outlet.shortAddress}</p>
                </div>
                <ChevronRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
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
  const { trending, chefsRecommendations } = useMemo(() => getDailyMenu(), []);

  return (
    <>
      <Helmet>
        <title>Scan & Order | VDumpling Dynasty</title>
        <meta name="description" content="Browse today's trending items and chef's recommendations at VDumpling Dynasty. Order online from your nearest outlet." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* --- Sticky Header --- */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/images/logo-circle.png" alt="VDumpling Dynasty" className="w-9 h-9" />
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-none">VDumpling Dynasty</h1>
                <p className="text-[10px] text-gray-400 mt-0.5 font-medium tracking-wide">Scan & Order</p>
              </div>
            </div>
            <button
              onClick={() => setOutletOpen(true)}
              className="bg-nepal-red text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5" />
              Order Online
            </button>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 pb-24">
          {/* --- Trending Today Section --- */}
          <section className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                <Flame className="w-[18px] h-[18px] text-nepal-red" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">Trending Today</h2>
                <p className="text-xs text-gray-400 mt-0.5">What everyone's ordering right now</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {trending.map((item, i) => (
                <TrendingCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>

          {/* --- Chef's Recommendations Section --- */}
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                <ChefHat className="w-[18px] h-[18px] text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">Chef's Recommendations</h2>
                <p className="text-xs text-gray-400 mt-0.5">Handpicked for an exceptional experience</p>
              </div>
            </div>

            <div
              className="rounded-2xl p-4 space-y-3"
              style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] text-amber-300/80 font-semibold uppercase tracking-[0.15em]">Premium Selection</span>
              </div>

              {chefsRecommendations.map((item, i) => (
                <ChefCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>

          {/* --- Daily Refresh Note --- */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-gray-400">
              Menu highlights refresh daily at midnight
            </p>
          </div>
        </main>

        {/* --- Fixed Bottom CTA --- */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-lg mx-auto px-4 py-3">
            <button
              onClick={() => setOutletOpen(true)}
              className="w-full bg-gradient-to-r from-nepal-red to-red-600 text-white font-bold py-3.5 rounded-xl hover:from-red-700 hover:to-red-700 transition-all shadow-lg shadow-red-200/50 flex items-center justify-center gap-2 text-base active:scale-[0.98]"
            >
              <MapPin className="w-[18px] h-[18px]" />
              Order Online
            </button>
          </div>
        </div>

        {/* --- Outlet Selection Overlay --- */}
        <OutletOverlay isOpen={outletOpen} onClose={() => setOutletOpen(false)} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default ScanAndOrderPage;

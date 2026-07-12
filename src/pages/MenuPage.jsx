import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, X, Phone, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, CATEGORY_LABELS } from '../data/menuData';
import OrderOnlineModal from '../components/OrderOnlineModal';

/* Brand spelling: the menu data comes from the POS as "Momo" — display it as Mo:Mo. */
const brandify = (text) => text.replace(/momos/gi, 'Mo:Mo').replace(/momo/gi, 'Mo:Mo');

/* ── Veg / Egg / Non-veg indicator ─────────────────────────────────────── */
const VegDot = ({ isVeg }) => {
  const color = isVeg === 'egg' ? '#EAB308' : isVeg ? '#22C55E' : '#EF4444';
  const label = isVeg === 'egg' ? 'Contains egg' : isVeg ? 'Vegetarian' : 'Non-vegetarian';
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 border flex-shrink-0 rounded-[3px]"
      style={{ borderColor: color }}
      title={label}
      aria-label={label}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
    </span>
  );
};

const DIET_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'veg', label: '🟢 Veg' },
  { key: 'egg', label: '🟡 Egg' },
  { key: 'nonveg', label: '🔴 Non-veg' },
];

const matchesDiet = (item, diet) => {
  if (diet === 'all') return true;
  if (diet === 'veg') return item.isVeg === true;
  if (diet === 'egg') return item.isVeg === 'egg';
  return item.isVeg === false;
};

/* ── Single item card ──────────────────────────────────────────────────── */
const MenuItemCard = ({ item }) => (
  <article className="group rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-crimson/50 hover:bg-white/[0.06] transition-all duration-300 p-4 sm:p-5 flex flex-col">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2.5 min-w-0">
        <span className="mt-1"><VegDot isVeg={item.isVeg} /></span>
        <h3 className="font-display font-bold text-white text-[15px] sm:text-base leading-snug">
          {brandify(item.name)}
        </h3>
      </div>
      <span className="font-display font-extrabold text-lantern text-lg whitespace-nowrap">₹{item.price}</span>
    </div>
    {item.description && (
      <p className="mt-2 text-[13px] text-white/50 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
        {brandify(item.description)}
      </p>
    )}
    <span className="mt-auto pt-3 text-[10px] font-bold tracking-widest uppercase text-white/25">
      {item.subCategory}
    </span>
  </article>
);

/* ── Page ──────────────────────────────────────────────────────────────── */
const MenuPage = () => {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('all');
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(MENU_CATEGORIES[0]);
  const sectionRefs = useRef({});
  const chipRefs = useRef({});
  const isClickScrolling = useRef(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((i) => {
      if (!matchesDiet(i, diet)) return false;
      if (!q) return true;
      // Match both raw POS spelling ("momo") and brand spelling ("mo:mo")
      const haystack = `${i.name} ${i.description} ${i.subCategory} ${brandify(i.name)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, diet]);

  const grouped = useMemo(() => {
    const map = new Map();
    MENU_CATEGORIES.forEach((c) => map.set(c, []));
    filtered.forEach((i) => map.get(i.category)?.push(i));
    return [...map.entries()].filter(([, items]) => items.length > 0);
  }, [filtered]);

  // Highlight the category currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const cat = visible[0].target.dataset.cat;
          setActiveCat(cat);
          chipRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [grouped]);

  const jumpTo = useCallback((cat) => {
    setActiveCat(cat);
    isClickScrolling.current = true;
    sectionRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { isClickScrolling.current = false; }, 900);
  }, []);

  return (
    <>
      <Helmet>
        <title>Menu | VDumpling Dynasty — Mo:Mo, Dim Sum, Noodles & More</title>
        <meta
          name="description"
          content="Explore the full VDumpling Dynasty menu — steamed, fried, jhol & kothey momos, dim sum, wontons, laphing, thukpa, wok-tossed noodles, fried rice and starters in Bhubaneswar & Cuttack."
        />
      </Helmet>

      <main className="bg-ink min-h-screen pb-28 md:pb-16">
        {/* ── Page hero ─────────────────────────────────────────────── */}
        <section className="relative pt-28 sm:pt-36 pb-6 overflow-hidden">
          <span className="absolute -right-8 -top-10 font-accent text-[13rem] leading-none text-white/[0.045] select-none pointer-events-none" aria-hidden="true">म:म:</span>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
            <p className="text-crimson font-bold tracking-mega uppercase text-xs mb-2">The full spread</p>
            <h1 className="font-display font-extrabold text-white text-4xl sm:text-6xl tracking-tight leading-[1.02]">
              The Dynasty <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern">Menu.</span>
            </h1>
            <p className="mt-3 text-white/50 max-w-xl text-sm sm:text-base">
              {MENU_ITEMS.length} dishes — Mo:Mo, dim sum, wok-tossed noodles, rice, starters, soups &amp; more. Happiness is free.
            </p>
          </div>
        </section>

        {/* ── Sticky filter bar ─────────────────────────────────────── */}
        <div className="sticky top-[57px] sm:top-[61px] z-30 bg-ink/90 backdrop-blur-lg border-b border-white/10 py-3">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-3">
            <div className="flex gap-2.5">
              {/* Search */}
              <label className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jhol, noodles, thukpa…"
                  className="w-full rounded-full bg-white/[0.06] border border-white/10 focus:border-crimson focus:outline-none text-white placeholder:text-white/30 text-sm pl-11 pr-10 py-2.5"
                />
                {query && (
                  <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X size={15} />
                  </button>
                )}
              </label>
              {/* Diet pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {DIET_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setDiet(f.key)}
                    className={`flex-shrink-0 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide transition-colors ${
                      diet === f.key ? 'bg-crimson text-white' : 'bg-white/[0.06] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
              {grouped.map(([cat]) => (
                <button
                  key={cat}
                  ref={(el) => (chipRefs.current[cat] = el)}
                  onClick={() => jumpTo(cat)}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold tracking-wide border transition-colors ${
                    activeCat === cat
                      ? 'bg-white text-ink border-white'
                      : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sections ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {grouped.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-accent text-6xl text-white/20 mb-4">म:</p>
              <p className="text-white/70 font-semibold text-lg">No dish matches that craving.</p>
              <button
                onClick={() => { setQuery(''); setDiet('all'); }}
                className="mt-5 rounded-full bg-crimson text-white font-bold px-6 py-3 active:scale-[0.98] transition-transform"
              >
                Reset filters
              </button>
            </div>
          ) : (
            grouped.map(([cat, items]) => (
              <section
                key={cat}
                data-cat={cat}
                ref={(el) => (sectionRefs.current[cat] = el)}
                className="pt-10 sm:pt-14"
                style={{ scrollMarginTop: '150px' }}
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight">
                    {CATEGORY_LABELS[cat] || cat}
                  </h2>
                  <span className="text-white/30 text-sm font-semibold">{items.length}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-crimson/50 to-transparent" aria-hidden="true" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {items.map((item) => <MenuItemCard key={item.id} item={item} />)}
                </div>
              </section>
            ))
          )}
        </div>

        {/* ── Order strip ───────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-16">
          <div className="rounded-3xl bg-crimson relative overflow-hidden p-7 sm:p-10 text-center grain">
            <span className="absolute -left-6 -bottom-10 font-accent text-[9rem] text-white/10 select-none" aria-hidden="true">म:</span>
            <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl relative">Craving sorted?</h2>
            <p className="text-white/80 mt-2 relative text-sm sm:text-base">
              Order online for pickup or delivery, call your nearest outlet, or find us on Swiggy.
            </p>
            <div className="relative mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setOrderOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-crimson font-bold px-8 py-4 active:scale-[0.98] transition-transform"
              >
                <ShoppingBag size={17} /> Order Online
              </button>
              <a
                href="tel:+919040018192"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 text-white font-bold px-8 py-4 hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <Phone size={17} /> +91 90400 18192
              </a>
            </div>
          </div>
        </div>

        <OrderOnlineModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      </main>
    </>
  );
};

export default MenuPage;

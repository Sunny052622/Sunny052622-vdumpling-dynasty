import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS, MENU_CATEGORIES, CATEGORY_LABELS } from '../data/menuData';

// ── Veg / Non-veg / Egg indicator dot ─────────────────────────────────────────
const VegDot = ({ isVeg }) => {
  if (isVeg === 'egg') {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4 border border-yellow-500 flex-shrink-0" title="Contains Egg">
        <span className="w-2 h-2 rounded-full bg-yellow-500" />
      </span>
    );
  }
  if (isVeg) {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4 border border-green-600 flex-shrink-0" title="Vegetarian">
        <span className="w-2 h-2 rounded-full bg-green-600" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 border border-red-600 flex-shrink-0" title="Non-Vegetarian">
      <span className="w-2 h-2 rounded-full bg-red-600" />
    </span>
  );
};

// ── Single menu item card ──────────────────────────────────────────────────────
const MenuItem = ({ item }) => (
  <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0">
    <div className="pt-0.5 flex-shrink-0">
      <VegDot isVeg={item.isVeg} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</p>
      {item.description && (
        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
      )}
    </div>
    <div className="flex-shrink-0 text-right">
      <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
    </div>
  </div>
);

// ── Category section ───────────────────────────────────────────────────────────
const CategorySection = ({ category, items }) => (
  <div id={`cat-${category}`} className="mb-2">
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 sticky top-[120px] z-20">
      <h2 className="font-bold text-base text-gray-900">{CATEGORY_LABELS[category] || category}</h2>
      <p className="text-xs text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''}</p>
    </div>
    <div className="bg-white px-4">
      {items.map(item => <MenuItem key={item.id} item={item} />)}
    </div>
  </div>
);

// ── Main Menu Page ─────────────────────────────────────────────────────────────
const MenuPage = ({ onOpenOutletModal }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const navRef = useRef(null);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return MENU_ITEMS;
    return MENU_ITEMS.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subCategory.toLowerCase().includes(q)
    );
  }, [search]);

  // Group filtered items by category (preserve MENU_CATEGORIES order)
  const grouped = useMemo(() => {
    const result = [];
    for (const cat of MENU_CATEGORIES) {
      const items = filteredItems.filter(i => i.category === cat);
      if (items.length > 0) result.push({ category: cat, items });
    }
    return result;
  }, [filteredItems]);

  // Highlight active category in nav on scroll
  useEffect(() => {
    const onScroll = () => {
      for (const { category } of grouped) {
        const el = document.getElementById(`cat-${category}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 160) {
          setActiveCategory(category);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [grouped]);

  const scrollToCategory = (cat) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveCategory(cat);
    }
  };

  const clearSearch = () => setSearch('');

  return (
    <>
      <Helmet>
        <title>Menu | VDumpling Dynasty</title>
        <meta name="description" content="Explore the full VDumpling Dynasty menu — authentic Nepali momos, thukpa, Tibetan laphing, starters, mains, and more. Dine in or order online." />
        <link rel="canonical" href="https://narprafoods.com/menu" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">

        {/* ── Sticky top bar: search + category pills ── */}
        <div className="sticky top-[74px] z-30 bg-white shadow-sm">

          {/* Search bar */}
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search momos, thukpa, starters…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent bg-gray-50"
              />
              {search && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category pill nav */}
          {!search && (
            <div ref={navRef} className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3 scroll-smooth">
              {MENU_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-nepal-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Menu Content ── */}
        <div className="max-w-3xl mx-auto pb-28">
          {grouped.length > 0 ? (
            grouped.map(({ category, items }) => (
              <CategorySection key={category} category={category} items={items} />
            ))
          ) : (
            <div className="text-center py-20 px-6">
              <p className="text-gray-500 text-lg font-medium">No items found for "{search}"</p>
              <button onClick={clearSearch} className="mt-3 text-nepal-red text-sm font-semibold hover:underline">
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* ── Fixed bottom CTA ── */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <Link
              to="/contact"
              className="w-full bg-nepal-red text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-[15px] hover:bg-red-700 transition-colors active:scale-[0.98] shadow-lg shadow-red-100"
            >
              <MapPin className="w-[18px] h-[18px]" />
              Find Us &amp; Order
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default MenuPage;

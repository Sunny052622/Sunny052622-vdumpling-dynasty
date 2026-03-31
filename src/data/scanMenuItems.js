// 15 real Dumpling Dynasty menu items for the Scan & Order page
// Daily randomization engine shuffles these into Trending / Chef's Recommendations zones

export const SCAN_MENU_ITEMS = [
  {
    id: 'sm-1',
    name: 'Jhol Mo:Mo',
    price: 160,
    description: 'Steamed momos swimming in a spicy, tangy Nepali-style soup broth',
    isVeg: false,
    category: 'Momos',
    popularity: 94,
    margin: 'high',
  },
  {
    id: 'sm-2',
    name: 'Prawn Salt & Pepper',
    price: 280,
    description: 'Crispy prawns tossed with crushed black pepper, garlic & fresh herbs',
    isVeg: false,
    category: 'Starters',
    popularity: 88,
    margin: 'high',
  },
  {
    id: 'sm-3',
    name: 'Paneer 65',
    price: 180,
    description: 'Crispy paneer cubes in a fiery red chilli-yogurt marinade',
    isVeg: true,
    category: 'Starters',
    popularity: 91,
    margin: 'high',
  },
  {
    id: 'sm-4',
    name: 'Chicken Steamed Momo',
    price: 140,
    description: 'Classic hand-wrapped momos filled with seasoned chicken mince',
    isVeg: false,
    category: 'Momos',
    popularity: 97,
    margin: 'standard',
  },
  {
    id: 'sm-5',
    name: 'Veg Fried Momo',
    price: 130,
    description: 'Golden pan-fried momos stuffed with mixed vegetables & herbs',
    isVeg: true,
    category: 'Momos',
    popularity: 85,
    margin: 'standard',
  },
  {
    id: 'sm-6',
    name: 'Chicken Chowmein',
    price: 160,
    description: 'Wok-tossed noodles with chicken, vegetables & smoky soy sauce',
    isVeg: false,
    category: 'Noodles',
    popularity: 82,
    margin: 'standard',
  },
  {
    id: 'sm-7',
    name: 'Veg Thukpa',
    price: 150,
    description: 'Comforting Tibetan noodle soup with garden-fresh vegetables',
    isVeg: true,
    category: 'Soups',
    popularity: 78,
    margin: 'standard',
  },
  {
    id: 'sm-8',
    name: 'Chicken Fried Rice',
    price: 160,
    description: 'Fragrant rice stir-fried with chicken, egg & Asian aromatics',
    isVeg: false,
    category: 'Rice',
    popularity: 80,
    margin: 'standard',
  },
  {
    id: 'sm-9',
    name: 'Paneer Chilli',
    price: 180,
    description: 'Indo-Chinese style paneer with bell peppers & spicy chilli sauce',
    isVeg: true,
    category: 'Starters',
    popularity: 86,
    margin: 'high',
  },
  {
    id: 'sm-10',
    name: 'Prawn Mo:Mo',
    price: 260,
    description: 'Premium momos filled with juicy prawn & delicate seasoning',
    isVeg: false,
    category: 'Momos',
    popularity: 90,
    margin: 'high',
  },
  {
    id: 'sm-11',
    name: 'Chicken Sekuwa',
    price: 220,
    description: 'Nepali-style charcoal-grilled chicken with bold Himalayan spices',
    isVeg: false,
    category: 'Starters',
    popularity: 87,
    margin: 'high',
  },
  {
    id: 'sm-12',
    name: 'Lamb Mo:Mo',
    price: 240,
    description: 'Succulent lamb-stuffed momos with aromatic spice blend',
    isVeg: false,
    category: 'Momos',
    popularity: 83,
    margin: 'high',
  },
  {
    id: 'sm-13',
    name: 'Fish Salt & Pepper',
    price: 250,
    description: 'Lightly battered fish fillets with cracked pepper & spring onion',
    isVeg: false,
    category: 'Starters',
    popularity: 79,
    margin: 'high',
  },
  {
    id: 'sm-14',
    name: 'Mushroom Dim Sum',
    price: 170,
    description: 'Delicate steamed dim sum parcels with shiitake mushroom filling',
    isVeg: true,
    category: 'Dim Sum',
    popularity: 76,
    margin: 'high',
  },
  {
    id: 'sm-15',
    name: 'Chicken Lollipop',
    price: 200,
    description: 'Crunchy spice-coated drumettes served with tangy schezwan dip',
    isVeg: false,
    category: 'Starters',
    popularity: 92,
    margin: 'standard',
  },
];

// --- Daily Randomization Engine ---
// Uses the current date as a seed so the layout changes every day at midnight
// but stays consistent throughout the day for all users.

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit int
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  // Simple LCG (Linear Congruential Generator)
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) & 0xffffffff;
    return (state >>> 0) / 0xffffffff;
  };
}

function shuffleWithSeed(array, seed) {
  const shuffled = [...array];
  const random = seededRandom(seed);
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getDailyMenu() {
  const today = new Date().toDateString(); // e.g. "Mon Mar 31 2026"
  const seed = hashString(today);
  const shuffled = shuffleWithSeed(SCAN_MENU_ITEMS, seed);

  return {
    trending: shuffled.slice(0, 8),
    chefsRecommendations: shuffled.slice(8, 15),
  };
}

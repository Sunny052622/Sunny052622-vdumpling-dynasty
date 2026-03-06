import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import CategoryAccordion from '../components/CategoryAccordion';

const MenuPage = ({ cart, onAddToCart, onNavigate, onOpenOutletModal }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [openAccordion, setOpenAccordion] = useState('Momos'); // Default open accordion

    // Sample Menu Data
    const menuItems = [
        { id: 1, name: 'Veg Steamed Momo', price: 80, category: 'Momos', isVeg: true, description: 'Classic steamed dumplings with mixed vegetable filling.', rating: 4.5, reviews: 120, isBestseller: true },
        { id: 2, name: 'Chicken Steamed Momo', price: 100, category: 'Momos', isVeg: false, description: 'Juicy chicken filling encased in soft dough.', rating: 4.7, reviews: 200, isBestseller: true },
        { id: 3, name: 'Paneer Fried Momo', price: 110, category: 'Momos', isVeg: true, description: 'Crispy fried momos filled with spiced paneer.', rating: 4.3, reviews: 85 },
        { id: 4, name: 'Chicken Kothey Momo', price: 120, category: 'Momos', isVeg: false, description: 'Pan-fried momos with a crispy bottom and soft top.', rating: 4.6, reviews: 150 },
        { id: 5, name: 'Veg Jhol Momo', price: 115, category: 'Momos', isVeg: true, description: 'Momos served in a spicy, tangy sesame-tomato soup.', rating: 4.8, reviews: 180, isBestseller: true },
        { id: 6, name: 'Chicken Chilli Momo', price: 140, category: 'Momos', isVeg: false, description: 'Fried momos tossed in spicy chilli sauce with peppers.', rating: 4.5, reviews: 130 },
        { id: 7, name: 'Veg Thukpa', price: 120, category: 'Thukpa', isVeg: true, description: 'Tibetan noodle soup with mixed vegetables.', rating: 4.4, reviews: 90 },
        { id: 8, name: 'Chicken Thukpa', price: 150, category: 'Thukpa', isVeg: false, description: 'Hearty noodle soup with chicken and greens.', rating: 4.6, reviews: 110 },
        { id: 9, name: 'Mixed Thukpa', price: 170, category: 'Thukpa', isVeg: false, description: 'Loaded noodle soup with chicken, egg, and veggies.', rating: 4.7, reviews: 75, isBestseller: true },
        { id: 10, name: 'Veg Hakka Noodles', price: 110, category: 'Noodles', isVeg: true, description: 'Stir-fried noodles with crunchy vegetables.', rating: 4.2, reviews: 100 },
        { id: 11, name: 'Chicken Schezwan Noodles', price: 140, category: 'Noodles', isVeg: false, description: 'Spicy noodles tossed in Schezwan sauce.', rating: 4.5, reviews: 140 },
        { id: 12, name: 'Veg Fried Rice', price: 100, category: 'Rice', isVeg: true, description: 'Classic fried rice with carrots, beans, and peas.', rating: 4.1, reviews: 80 },
        { id: 13, name: 'Chicken Fried Rice', price: 130, category: 'Rice', isVeg: false, description: 'Wok-tossed rice with chicken chunks and egg.', rating: 4.4, reviews: 120 },
        { id: 14, name: 'Chicken Sekuwa', price: 180, category: 'Specials', isVeg: false, description: 'Traditional Nepali style BBQ chicken.', rating: 4.8, reviews: 60, isBestseller: true },
        { id: 15, name: 'Aloo Dum', price: 90, category: 'Specials', isVeg: true, description: 'Spicy Nepali potato curry.', rating: 4.3, reviews: 50 },
        { id: 16, name: 'Chicken Choila', price: 160, category: 'Specials', isVeg: false, description: 'Spiced grilled chicken marinated with mustard oil.', rating: 4.7, reviews: 70 },
        { id: 17, name: 'Coke (250ml)', price: 40, category: 'Beverages', isVeg: true, description: 'Chilled soft drink.', rating: 4.0, reviews: 40 },
        { id: 18, name: 'Masala Coke', price: 60, category: 'Beverages', isVeg: true, description: 'Coke with a spicy twist of masala.', rating: 4.5, reviews: 55 }
    ];

    const categories = ['Momos', 'Thukpa', 'Noodles', 'Rice', 'Specials', 'Beverages'];

    // Filter items based on search and category
    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    // Group filtered items by category for the accordion view
    const groupedItems = useMemo(() => {
        const groups = {};
        categories.forEach(cat => {
            const itemsInCat = filteredItems.filter(item => item.category === cat);
            if (itemsInCat.length > 0) {
                groups[cat] = itemsInCat;
            }
        });
        return groups;
    }, [filteredItems]);

    const handleToggleAccordion = (category) => {
        setOpenAccordion(openAccordion === category ? null : category);
    };

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Menu Header */}
            <div className="bg-white shadow-sm sticky top-[74px] z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search for momos, thukpa..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === 'All' ? 'bg-nepal-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-nepal-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Menu Items List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {Object.keys(groupedItems).length > 0 ? (
                        Object.entries(groupedItems).map(([category, items]) => (
                            <CategoryAccordion
                                key={category}
                                category={category}
                                items={items}
                                isOpen={openAccordion === category || activeCategory === category} // Auto open if category filter is active
                                onToggle={() => handleToggleAccordion(category)}
                                onAddToCart={onAddToCart}
                                cart={cart}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No items found matching your search.</p>
                            <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="mt-4 text-nepal-blue font-semibold hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Cart Button (Mobile) */}
            {totalCartItems > 0 && (
                <div className="fixed bottom-6 left-0 right-0 px-4 z-50 md:hidden">
                    <button
                        onClick={onOpenOutletModal}
                        className="w-full bg-nepal-red text-white rounded-xl shadow-lg p-4 flex justify-between items-center"
                    >
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-lg">{totalCartItems} Items | ₹{totalCartPrice}</span>
                            <span className="text-xs text-red-100">Extra charges may apply</span>
                        </div>
                        <div className="flex items-center font-bold text-lg">
                            View Cart <ShoppingBag className="ml-2 w-5 h-5" />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MenuPage;

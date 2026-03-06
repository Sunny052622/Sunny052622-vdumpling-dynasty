import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MenuItem from './MenuItem';

const CategoryAccordion = ({ category, items, isOpen, onToggle, onAddToCart, cart }) => (
    <div className="border-b border-gray-200 last:border-b-0">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center py-5 px-2 md:px-4 text-left focus:outline-none hover:bg-gray-50/80 transition duration-200"
            aria-expanded={isOpen}
            aria-controls={`category-items-${category.replace(/\s+/g, '-')}`}
        >
            <h3 className="text-lg md:text-xl font-bold text-nepal-blue">{category} ({items.length})</h3>
            {isOpen ? <ChevronUp className="w-6 h-6 text-nepal-red" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
        </button>
        {isOpen && (
            <div
                id={`category-items-${category.replace(/\s+/g, '-')}`}
                className="pb-4 px-2 md:px-4 bg-white"
            >
                {items.length > 0 ? (
                    items.map(item => {
                        const cartItem = cart.find(cartItem => cartItem.id === item.id);
                        const count = cartItem ? cartItem.quantity : 0;
                        return (
                            <MenuItem
                                key={item.id}
                                item={item}
                                onAddToCart={onAddToCart}
                                cartItemCount={count}
                            />
                        );
                    })
                ) : (
                    <p className="text-gray-500 italic py-4 text-center">No items found here!</p>
                )}
            </div>
        )}
    </div>
);

export default CategoryAccordion;

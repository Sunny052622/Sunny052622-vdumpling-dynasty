import React from 'react';
import { Leaf, TriangleAlert, Star } from 'lucide-react';

const MenuItem = ({ item, onAddToCart, cartItemCount }) => {
    const handleAdd = () => onAddToCart(item, 1);
    const handleIncrement = () => onAddToCart(item, 1);
    const handleDecrement = () => onAddToCart(item, -1);

    return (
        <div className="flex justify-between items-start py-6 border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:bg-gray-50/50 -mx-2 px-2">
            <div className="flex-1 pr-4">
                <div className="mb-1.5 flex items-center space-x-2">
                    {item.isVeg ? (
                        <Leaf className="w-4 h-4 text-green-600 border border-green-600 p-0.5 rounded-sm" aria-label="Vegetarian" />
                    ) : (
                        <TriangleAlert className="w-4 h-4 text-red-600 border border-red-600 p-0.5 rounded-sm" aria-label="Non-Vegetarian" />
                    )}
                    {item.isBestseller && (
                        <span className="text-xs font-semibold text-nepal-red bg-red-100 px-2 py-0.5 rounded-full flex items-center">
                            <Star size={12} className="inline-block mr-1" fill="currentColor" /> Bestseller
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap justify-between items-start">
                    <div className="flex-1 mr-4">
                        <h4 className="font-semibold text-gray-800 text-base md:text-lg">{item.name}</h4>
                        <p className="text-base font-bold text-gray-900 mt-1">₹{item.price}</p>
                        {item.rating && (
                            <div className="flex items-center text-sm text-gray-500 mt-1.5">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                                <span className="font-medium">{item.rating.toFixed(1)}</span>
                                <span className="ml-1">({item.reviews} ratings)</span>
                            </div>
                        )}
                        <p className="text-sm text-gray-600 mt-2 leading-snug">{item.description}</p>
                    </div>
                    <div className="flex-shrink-0 w-24 mt-2">
                        {cartItemCount === 0 ? (
                            <button
                                onClick={handleAdd}
                                className="w-full bg-white text-green-600 border-2 border-green-500 shadow-md text-sm font-bold py-1.5 px-4 rounded-md hover:bg-green-50 transition duration-200"
                                aria-label={`Add ${item.name} to cart`}
                            >
                                ADD
                            </button>
                        ) : (
                            <div className="w-full bg-nepal-red text-white border border-nepal-red shadow-lg text-sm font-bold rounded-md hover:shadow-xl transition duration-200 flex justify-between items-center">
                                <button onClick={handleDecrement} className="px-2.5 py-1.5 text-lg font-bold hover:bg-red-700 rounded-l-md" aria-label={`Decrease quantity of ${item.name}`}>-</button>
                                <span className="px-1 font-semibold" aria-live="polite">{cartItemCount}</span>
                                <button onClick={handleIncrement} className="px-2.5 py-1.5 text-lg font-bold hover:bg-red-700 rounded-r-md" aria-label={`Increase quantity of ${item.name}`}>+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;

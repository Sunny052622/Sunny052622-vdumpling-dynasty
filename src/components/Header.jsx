import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Header = ({ cartItemCount, onOpenOutletModal }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = (id) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-nepal-red">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center cursor-pointer"
                    aria-label="VDumpling Dynasty Home"
                >
                    <img
                        src="/images/logo-circle.png"
                        alt="VDumpling Dynasty Logo"
                        className="w-12 h-12 mr-3"
                        onError={(e) => {
                            console.error('Logo failed to load');
                            e.target.style.display = 'none';
                        }}
                    />
                    <span className="text-3xl font-bold text-nepal-red font-sans">VDumpling Dynasty</span>
                </Link>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Home</Link>
                    <button onClick={onOpenOutletModal} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Menu</button>
                    <Link to="/blog" className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Blog</Link>
                    <button onClick={() => handleScroll('offers')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Offers</button>
                    <button onClick={() => handleScroll('about-journey')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">About</button>
                    <button onClick={() => handleScroll('contact')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Contact</button>
                    <button
                        onClick={onOpenOutletModal}
                        className="bg-nepal-red text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center space-x-2 shadow hover:shadow-md transform hover:-translate-y-0.5"
                        aria-label="Order Now - Opens external menu"
                    >
                        <ShoppingCart size={18} />
                        <span className="font-semibold">Order Now</span>
                    </button>
                </div>
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={onOpenOutletModal}
                        className="bg-nepal-red text-white p-2 rounded-full hover:bg-opacity-90 transition duration-300 relative shadow"
                        aria-label="Order Now - Opens external menu"
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <button className="text-gray-700 focus:outline-none" aria-label="Open mobile menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;

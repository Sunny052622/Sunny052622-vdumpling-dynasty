import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Menu } from 'lucide-react';

const Header = ({ cartItemCount, onOpenOutletModal }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    const handleScroll = (id) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-nepal-red">
            <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center cursor-pointer"
                    aria-label="VDumpling Dynasty Home"
                    onClick={handleLinkClick}
                >
                    <img
                        src="/images/logo-circle.png"
                        alt="VDumpling Dynasty Logo"
                        className="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-nepal-red font-sans">VDumpling Dynasty</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Home</Link>
                    <Link to="/menu" className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Menu</Link>
                    <Link to="/blog" className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Blog</Link>
                    <button onClick={() => handleScroll('offers')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Offers</button>
                    <button onClick={() => handleScroll('about-journey')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">About</button>
                    <button onClick={() => handleScroll('contact')} className="text-gray-700 hover:text-nepal-blue transition duration-300 font-medium">Contact</button>
                    <button
                        onClick={onOpenOutletModal}
                        className="bg-nepal-red text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center space-x-2 shadow hover:shadow-md transform hover:-translate-y-0.5"
                        aria-label="Find our outlets and order"
                    >
                        <ShoppingCart size={18} />
                        <span className="font-semibold">Order Now</span>
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center space-x-3">
                    <button
                        onClick={onOpenOutletModal}
                        className="bg-nepal-red text-white p-2.5 rounded-full hover:bg-opacity-90 transition duration-300 shadow"
                        aria-label="Order Now"
                    >
                        <ShoppingCart size={18} />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 p-2 focus:outline-none"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
                    <Link
                        to="/"
                        onClick={handleLinkClick}
                        className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/menu"
                        onClick={handleLinkClick}
                        className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        Menu
                    </Link>
                    <Link
                        to="/blog"
                        onClick={handleLinkClick}
                        className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        Blog
                    </Link>
                    <button
                        onClick={() => handleScroll('offers')}
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        Offers
                    </button>
                    <button
                        onClick={() => handleScroll('about-journey')}
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleScroll('contact')}
                        className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-nepal-red rounded-md font-medium transition-colors"
                    >
                        Contact
                    </button>
                    <button
                        onClick={() => { handleLinkClick(); onOpenOutletModal(); }}
                        className="block w-full mt-2 bg-nepal-red text-white py-3 px-4 rounded-md font-semibold text-center hover:bg-opacity-90 transition-colors"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

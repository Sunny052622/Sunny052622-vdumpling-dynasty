import React, { useState, useEffect } from 'react';
import ThemedPlaceholderImage from './ThemedPlaceholderImage';

const ImageCarousel = ({ images, interval = 3000, height = "md" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const [isAnimating, setIsAnimating] = useState(false);

    // Function to handle the slide transition
    const slideToIndex = (index) => {
        setIsAnimating(true);
        // Determine direction of animation
        if (index > currentIndex || (currentIndex === images.length - 1 && index === 0)) {
            setDirection('right');
        } else {
            setDirection('left');
        }
        setCurrentIndex(index);
        // Reset animation state after transition completes
        setTimeout(() => setIsAnimating(false), 600);
    };

    useEffect(() => {
        if (images.length === 0) return;

        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            slideToIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval, currentIndex]);

    if (images.length === 0) {
        return <ThemedPlaceholderImage height="64" text="Visuals Coming Soon!" className="mb-4 shadow-md rounded-xl" />;
    }

    // Height options based on the parameter
    const heightClass = {
        "sm": "h-48 md:h-64",
        "md": "h-64 md:h-80",
        "lg": "h-80 md:h-96",
        "xl": "h-96 md:h-[28rem]"
    }[height] || "h-64 md:h-80"; // Default to medium if invalid height is provided

    // Animation styles
    const slideInRightStyle = {
        animation: 'slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both'
    };

    const slideInLeftStyle = {
        animation: 'slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both'
    };

    return (
        <div className={`relative w-full ${heightClass} overflow-hidden rounded-xl shadow-lg mb-4`}>
            {/* Add CSS for slide animations */}
            <style>
                {`
                @keyframes slideInRight {
                    0% { transform: translateX(100%); }
                    70% { transform: translateX(-2%); }
                    100% { transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    0% { transform: translateX(-100%); }
                    70% { transform: translateX(2%); }
                    100% { transform: translateX(0); }
                }
                `}
            </style>

            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${index === currentIndex ? 'z-10' : 'z-0'
                        }`}
                    style={{
                        display: index === currentIndex ? 'block' : 'none',
                        ...(index === currentIndex && direction === 'right' ? slideInRightStyle : {}),
                        ...(index === currentIndex && direction === 'left' ? slideInLeftStyle : {})
                    }}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/cccccc/999999?text=Image+Error";
                        e.target.alt = "Error loading image";
                    }}
                />
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => slideToIndex(index)}
                        disabled={isAnimating}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-nepal-red' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;

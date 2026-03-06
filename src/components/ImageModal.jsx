import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, imageUrl, altText = "Flyer Image" }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={28} />
                </button>
                <h3 id="modal-title" className="text-xl font-bold text-nepal-red mb-4">Special Offer Details</h3>
                <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto object-contain rounded-md"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x800/cccccc/999999?text=Image+Not+Available";
                        e.target.alt = "Error loading image";
                    }}
                />
            </div>
        </div>
    );
};

export default ImageModal;

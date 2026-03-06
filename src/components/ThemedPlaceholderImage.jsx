import React from 'react';

const ThemedPlaceholderImage = ({ width = 'full', height = '64', text = 'Visual Placeholder', className = '' }) => (
    <div className={`bg-gradient-to-br from-red-50 via-white to-blue-50 border border-gray-200 rounded-lg flex items-center justify-center w-${width} h-${height} ${className} overflow-hidden`}>
        <span className="text-center text-sm p-3 text-gray-600 font-medium">{text}</span>
    </div>
);

export default ThemedPlaceholderImage;

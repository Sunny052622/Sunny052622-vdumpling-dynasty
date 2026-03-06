// Centralized outlet data - used by Contact, Footer, and OutletSelectionModal
// Update addresses here to sync across the site

export const OUTLETS = [
    {
        id: 'kalinganagar',
        name: 'VDD Kalinganagar',
        address: 'VDumpling Dynasty, Kalinganagar, Near Anandaban Park, Bhubaneswar, Odisha, India - 751003',
        shortAddress: 'Near Anandaban Park, Bhubaneswar - 751003',
        mapQuery: 'VDumpling Dynasty Kalinganagar Anandaban Park Bhubaneswar',
        borderColor: 'nepal-red',
    },
    {
        id: 'patia',
        name: 'VDD Patia',
        address: 'VDumpling Dynasty, Galaxia Garden, Infocity, Patia, Bhubaneswar, Odisha, India - 751024',
        shortAddress: 'Galaxia Garden, Infocity, Patia - 751024',
        mapQuery: 'VDumpling Dynasty Galaxia Garden Infocity Patia Bhubaneswar',
        borderColor: 'nepal-blue',
    },
    {
        id: 'saheednagar',
        name: 'VDD Saheed Nagar',
        address: 'VDumpling Dynasty, Near Water Tank, Saheed Nagar, Bhubaneswar, Odisha, India - 751007',
        shortAddress: 'Near Water Tank, Saheed Nagar, Bhubaneswar - 751007',
        mapQuery: 'VDumpling Dynasty Saheed Nagar Water Tank Bhubaneswar',
        borderColor: 'yellow-500',
    },
    {
        id: 'cuttack',
        name: 'VDD Cuttack',
        address: 'VDumpling Dynasty, Sec-9, CDA, Cuttack, Odisha, India - 753014',
        shortAddress: 'Sec-9, CDA, Cuttack - 753014',
        mapQuery: 'VDumpling Dynasty Sec-9 CDA Cuttack',
        borderColor: 'emerald-500',
    },
];

// Helper to get Google Maps directions URL
export const getMapUrl = (outlet) => {
    const query = encodeURIComponent(outlet.mapQuery || outlet.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

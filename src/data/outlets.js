// Centralized outlet data - used by Contact, Footer, and OutletSelectionModal
// Update addresses here to sync across the site

export const OUTLETS = [
    {
        id: 'kalinganagar',
        name: 'VDD Kalinganagar',
        address: 'VDumpling Dynasty, Kalinganagar, Near Anandaban Park, Bhubaneswar, Odisha, India - 751003',
        shortAddress: 'Near Anandaban Park, Bhubaneswar - 751003',
        mapQuery: 'VDumpling Dynasty Kalinganagar Anandaban Park Bhubaneswar',
        orderUrl: 'https://vdumplingdynasty.petpooja.com/menu',
        borderColor: 'nepal-red',
    },
    {
        id: 'patia',
        name: 'VDD Patia',
        address: 'VDumpling Dynasty, Galaxia Garden, Infocity, Patia, Bhubaneswar, Odisha, India - 751024',
        shortAddress: 'Galaxia Garden, Infocity, Patia - 751024',
        mapQuery: 'VDumpling Dynasty Galaxia Garden Infocity Patia Bhubaneswar',
        orderUrl: 'https://vddynasty.petpooja.com/menu',
        borderColor: 'nepal-blue',
    },
    {
        id: 'saheednagar',
        name: 'VDD Saheed Nagar',
        address: 'VDumpling Dynasty, Near Water Tank, Saheed Nagar, Bhubaneswar, Odisha, India - 751007',
        shortAddress: 'Near Water Tank, Saheed Nagar, Bhubaneswar - 751007',
        mapQuery: 'VDumpling Dynasty Saheed Nagar Water Tank Bhubaneswar',
        orderUrl: 'https://vddsaheednagar.petpooja.com/menu',
        borderColor: 'yellow-500',
    },
    {
        id: 'cuttack',
        name: 'VDD Cuttack',
        address: 'VDumpling Dynasty, Sec-9, CDA, Cuttack, Odisha, India - 753014',
        shortAddress: 'Sec-9, CDA, Cuttack - 753014',
        mapQuery: 'VDumpling Dynasty Sec-9 CDA Cuttack',
        orderUrl: 'https://vddynasty.petpooja.com/menu',
        borderColor: 'emerald-500',
    },
    {
        id: 'jatni',
        name: 'VDD Jatni',
        address: 'VDumpling Dynasty, Nr Union Bank, Bali Chhak Sahi, Jatni, Khordha, Odisha, India - 752050',
        shortAddress: 'Nr Union Bank, Bali Chhak Sahi, Jatni, Khordha - 752050',
        mapQuery: 'VDumpling Dynasty Union Bank Bali Chhak Sahi Jatni Khordha',
        // orderUrl: add Jatni's Petpooja link here to enable online ordering for it
        borderColor: 'nepal-red',
    },
];

// Outlets that are open for business (ordering, calls, directions CTAs)
export const ACTIVE_OUTLETS = OUTLETS.filter((o) => !o.comingSoon);

// Helper to get Google Maps directions URL
export const getMapUrl = (outlet) => {
    const query = encodeURIComponent(outlet.mapQuery || outlet.address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

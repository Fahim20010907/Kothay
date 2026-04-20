// src/pages/StreetFood/locationCoordinates.js

// Location to coordinates mapping for Dhaka areas
export const locationCoordinates = {
    // Shahbagh / New Market Area
    'Shahbagh': { lat: 23.7381, lng: 90.3945 },
    'Shahbagh / New Market': { lat: 23.7381, lng: 90.3945 },
    'New Market': { lat: 23.7381, lng: 90.3945 },
    'New Market Area': { lat: 23.7381, lng: 90.3945 },

    // Dhanmondi
    'Dhanmondi': { lat: 23.7459, lng: 90.3762 },
    'Dhanmondi 27': { lat: 23.7519, lng: 90.3762 },
    'Dhanmondi 8': { lat: 23.7429, lng: 90.3762 },
    'Dhanmondi 4': { lat: 23.7489, lng: 90.3762 },

    // Gulshan
    'Gulshan': { lat: 23.7904, lng: 90.4160 },
    'Gulshan Avenue': { lat: 23.7904, lng: 90.4160 },
    'Gulshan 1': { lat: 23.7894, lng: 90.4160 },
    'Gulshan 2': { lat: 23.7914, lng: 90.4160 },

    // Banani
    'Banani': { lat: 23.7945, lng: 90.4040 },
    'Banani 11': { lat: 23.7945, lng: 90.4040 },

    // Old Dhaka / Chawkbazar
    'Old Dhaka': { lat: 23.7100, lng: 90.4040 },
    'Old Dhaka / Chawkbazar': { lat: 23.7100, lng: 90.4040 },
    'Chawkbazar': { lat: 23.7100, lng: 90.4040 },

    // Mirpur
    'Mirpur': { lat: 23.8063, lng: 90.3700 },
    'Mirpur 10': { lat: 23.8063, lng: 90.3700 },
    'Mirpur 1': { lat: 23.8043, lng: 90.3700 },
    'Mirpur 2': { lat: 23.8083, lng: 90.3700 },

    // Motijheel
    'Motijheel': { lat: 23.7339, lng: 90.4179 },

    // Uttara
    'Uttara': { lat: 23.8759, lng: 90.3795 },

    // Elephant Road
    'Elephant Road': { lat: 23.7415, lng: 90.3925 },

    // Panthapath
    'Panthapath': { lat: 23.7485, lng: 90.3885 },

    // Kawran Bazar
    'Kawran Bazar': { lat: 23.7555, lng: 90.3855 },

    // Bashabo
    'Bashabo': { lat: 23.7585, lng: 90.4255 },

    // Khilgaon
    'Khilgaon': { lat: 23.7455, lng: 90.4305 },
    'Taltola Market': { lat: 23.7455, lng: 90.4305 },

    // Mohakhali
    'Mohakhali': { lat: 23.7775, lng: 90.4065 },

    // Tejgaon
    'Tejgaon': { lat: 23.7595, lng: 90.4015 },

    // Farmgate
    'Farmgate': { lat: 23.7645, lng: 90.3905 },

    // Malibagh
    'Malibagh': { lat: 23.7485, lng: 90.4125 },

    // Shantinagar
    'Shantinagar': { lat: 23.7355, lng: 90.4155 },
};

// Get coordinates for a stall based on its location and area
export const getStallCoordinates = (stall) => {
    // PRIORITY 1: Use stored coordinates if available (from user-added spots)
    if (stall.latitude && stall.longitude) {
        return { lat: stall.latitude, lng: stall.longitude };
    }

    // PRIORITY 2: Try to match by area
    if (stall.area && locationCoordinates[stall.area]) {
        return locationCoordinates[stall.area];
    }

    // PRIORITY 3: Try to match by location (extract area name)
    const locationLower = stall.location?.toLowerCase() || '';

    // Check each known location
    for (const [key, coords] of Object.entries(locationCoordinates)) {
        if (locationLower.includes(key.toLowerCase())) {
            return coords;
        }
    }

    // PRIORITY 4: Default to Dhaka city center if no match found
    return { lat: 23.8103, lng: 90.4125 };
};
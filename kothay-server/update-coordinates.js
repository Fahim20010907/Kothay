// update-coordinates.js - Run this once to update existing food spots
const axios = require('axios');

const areaCoordinates = {
    // Existing areas
    'Shahbagh': { lat: 23.7381, lng: 90.3945 },
    'New Market': { lat: 23.7381, lng: 90.3945 },
    'Dhanmondi': { lat: 23.7459, lng: 90.3762 },
    'Gulshan': { lat: 23.7904, lng: 90.4160 },
    'Banani': { lat: 23.7945, lng: 90.4040 },
    'Old Dhaka': { lat: 23.7100, lng: 90.4040 },
    'Chawkbazar': { lat: 23.7100, lng: 90.4040 },
    'Mirpur': { lat: 23.8063, lng: 90.3700 },
    'Motijheel': { lat: 23.7339, lng: 90.4179 },
    'Uttara': { lat: 23.8759, lng: 90.3795 },
    'Elephant Road': { lat: 23.7415, lng: 90.3925 },
    'Panthapath': { lat: 23.7485, lng: 90.3885 },
    'Kawran Bazar': { lat: 23.7555, lng: 90.3855 },
    'Bashabo': { lat: 23.7585, lng: 90.4255 },
    'Khilgaon': { lat: 23.7455, lng: 90.4305 },

    // NEW: Add missing areas
    'khilgaon': { lat: 23.7455, lng: 90.4305 },
    'Khilgaon': { lat: 23.7455, lng: 90.4305 },
    'Modhubag': { lat: 23.7555, lng: 90.4155 },
    'Modhubag': { lat: 23.7555, lng: 90.4155 },
    'Banasree': { lat: 23.7655, lng: 90.4255 },
    'banasree': { lat: 23.7655, lng: 90.4255 },
    'Rampura': { lat: 23.7655, lng: 90.4205 },
    'Badda': { lat: 23.7755, lng: 90.4255 },
    'Mohakhali': { lat: 23.7775, lng: 90.4065 },
    'Tejgaon': { lat: 23.7595, lng: 90.4015 },
    'Farmgate': { lat: 23.7645, lng: 90.3905 },
    'Malibagh': { lat: 23.7485, lng: 90.4125 },
    'Shantinagar': { lat: 23.7355, lng: 90.4155 },
    'Jatrabari': { lat: 23.7155, lng: 90.4255 },
    'Demra': { lat: 23.7055, lng: 90.4455 },
    'Shyampur': { lat: 23.7255, lng: 90.4355 },
    'Kadamtali': { lat: 23.6955, lng: 90.4355 },
    'Kamrangirchar': { lat: 23.6855, lng: 90.3655 },
    'Lalbagh': { lat: 23.7185, lng: 90.3985 },
    'Bangshal': { lat: 23.7155, lng: 90.4085 },
    'Sutrapur': { lat: 23.7085, lng: 90.4085 },
    'Gendaria': { lat: 23.7085, lng: 90.4185 },
    'Wari': { lat: 23.7185, lng: 90.4185 },
    'Ramna': { lat: 23.7385, lng: 90.3985 },
    'Segunbagicha': { lat: 23.7385, lng: 90.4085 },
    'Kakrail': { lat: 23.7385, lng: 90.4085 },
    'Shantinagar': { lat: 23.7355, lng: 90.4155 },
    'Eskaton': { lat: 23.7385, lng: 90.3985 },
    'Moghbazar': { lat: 23.7555, lng: 90.3985 },
    'Nakhalpara': { lat: 23.7655, lng: 90.3985 },
};

async function updateCoordinates() {
    try {
        // Get all food spots
        const response = await axios.get('http://localhost:3000/api/street-food');
        const spots = response.data.data;

        let updated = 0;
        let notFound = [];

        for (const spot of spots) {
            // Skip if already has coordinates
            if (spot.latitude && spot.longitude) {
                console.log(`⏭️ Skipping ${spot.name} - already has coordinates`);
                continue;
            }

            // Find matching area (case insensitive)
            let coords = null;
            const searchText = (spot.area + ' ' + spot.location).toLowerCase();

            for (const [area, coord] of Object.entries(areaCoordinates)) {
                if (searchText.includes(area.toLowerCase())) {
                    coords = coord;
                    break;
                }
            }

            if (coords) {
                await axios.patch(`http://localhost:3000/api/street-food/${spot._id}`, {
                    latitude: coords.lat,
                    longitude: coords.lng
                });
                console.log(`✅ Updated: ${spot.name} (${spot.area || spot.location}) -> ${coords.lat}, ${coords.lng}`);
                updated++;
            } else {
                console.log(`❌ Could not find area for: ${spot.name} (Area: ${spot.area}, Location: ${spot.location})`);
                notFound.push({ name: spot.name, area: spot.area, location: spot.location });
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Updated: ${updated} food spots`);
        console.log(`   ❌ Not found: ${notFound.length} food spots`);

        if (notFound.length > 0) {
            console.log(`\n📍 Missing areas to add to mapping:`);
            notFound.forEach(item => {
                console.log(`   - ${item.area || item.location}`);
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

updateCoordinates();
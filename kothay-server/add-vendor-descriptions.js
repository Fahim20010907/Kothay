const axios = require('axios');

async function addVendorDescriptions() {
    try {
        // Get all markets
        const marketsRes = await axios.get('http://localhost:3000/api/markets');
        const markets = marketsRes.data.data;

        for (const market of markets) {
            let updated = false;
            const vendorsList = market.vendorsList || [];

            const updatedVendors = vendorsList.map(vendor => {
                if (vendor.name === 'Laptop House' && !vendor.description) {
                    updated = true;
                    return {
                        ...vendor,
                        description: 'Authorized laptop retailer offering the latest models from top brands. Specializes in gaming laptops, ultrabooks, and professional workstations. All products come with official warranty and after-sales support.',
                        openingHours: '10:00 AM - 8:00 PM (Friday Closed)'
                    };
                }
                if (vendor.name === 'Mobile Bazar' && !vendor.description) {
                    updated = true;
                    return {
                        ...vendor,
                        description: 'Premium mobile accessories and repair shop. Specializes in original smartphone covers, tempered glass, and fast chargers. Expert technicians for all mobile repairs.',
                        openingHours: '10:30 AM - 8:30 PM'
                    };
                }
                return vendor;
            });

            if (updated) {
                await axios.patch(`http://localhost:3000/api/markets/${market._id}`, {
                    vendorsList: updatedVendors
                });
                console.log(`✅ Updated vendors for: ${market.name}`);
            }
        }

        console.log('🎉 Done! Vendor descriptions added.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

addVendorDescriptions();
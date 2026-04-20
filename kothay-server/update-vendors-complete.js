// update-vendors-complete.js - Add complete vendor data
const axios = require('axios');

const marketsWithCompleteVendors = [
    {
        marketName: 'Chadni Chowk',
        vendors: [
            {
                name: 'Mobile Bazar',
                stallNo: 'Ground Floor, Shop 5',
                products: ['Mobile Phones', 'Accessories', 'Covers', 'Screen Protectors', 'Chargers'],
                priceRange: 'Affordable',
                rating: 4.2,
                isVerified: true,
                contact: '01711-123456',
                openingHours: '11:00 AM - 8:00 PM',
                description: 'One of the oldest mobile accessories shops in Chadni Chowk. Known for quality products and reasonable prices. Specializes in smartphone covers, screen protectors, and original chargers.'
            },
            {
                name: 'Repair Pro',
                stallNo: '1st Floor, Shop 12',
                products: ['Mobile Repair', 'Screen Replacement', 'Battery Change', 'Water Damage Repair'],
                priceRange: 'Affordable',
                rating: 4.0,
                isVerified: false,
                contact: '01822-345678',
                openingHours: '10:00 AM - 7:00 PM',
                description: 'Expert mobile repair service with quick turnaround. Specializes in iPhone and Samsung repairs.'
            }
        ]
    },
    {
        marketName: 'New Market',
        vendors: [
            {
                name: 'Rupa Electronics',
                stallNo: '1st Floor, Stall 12',
                products: ['Mobile', 'Laptop', 'Headphones', 'Power Bank', 'Smartwatches'],
                priceRange: 'Mid-range',
                rating: 4.5,
                isVerified: true,
                contact: '01933-456789',
                openingHours: '10:30 AM - 9:00 PM',
                description: 'Authorized reseller of major electronics brands. Best place for quality electronics with warranty.'
            },
            {
                name: 'New Market Book Center',
                stallNo: 'Ground Floor, Stall 45',
                products: ['Academic Books', 'Novels', 'Stationery', 'Magazines', 'Children Books'],
                priceRange: 'Affordable',
                rating: 4.2,
                isVerified: false,
                contact: '01744-567890',
                openingHours: '10:00 AM - 8:30 PM',
                description: 'Vast collection of academic and general books. Special discounts for students.'
            },
            {
                name: 'Fashion Gallery',
                stallNo: '2nd Floor, Stall 23',
                products: ['Men\'s Shirts', 'Pants', 'Accessories', 'Jeans', 'T-Shirts'],
                priceRange: 'Affordable',
                rating: 4.0,
                isVerified: false,
                contact: '01855-678901',
                openingHours: '11:00 AM - 9:00 PM',
                description: 'Latest fashion trends at affordable prices. Quality fabrics and perfect fitting.'
            }
        ]
    },
    {
        marketName: 'Bashundhara City',
        vendors: [
            {
                name: 'Apple Premium Reseller',
                stallNo: 'Level 3, Shop 101',
                products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch', 'AirPods'],
                priceRange: 'Premium',
                rating: 4.8,
                isVerified: true,
                contact: '01766-789012',
                openingHours: '10:00 AM - 10:00 PM',
                description: 'Official Apple authorized reseller. Genuine products with official warranty.'
            },
            {
                name: 'Samsung Experience',
                stallNo: 'Level 3, Shop 105',
                products: ['Galaxy Phones', 'Tablets', 'Smartwatches', 'Buds', 'TV'],
                priceRange: 'Premium',
                rating: 4.7,
                isVerified: true,
                contact: '01877-890123',
                openingHours: '10:00 AM - 10:00 PM',
                description: 'Official Samsung experience store. Try and buy latest Samsung products.'
            },
            {
                name: 'Aarong',
                stallNo: 'Level 2, Shop 50',
                products: ['Traditional Clothing', 'Handicrafts', 'Home Decor', 'Gifts', 'Jewelry'],
                priceRange: 'Mid-range',
                rating: 4.5,
                isVerified: true,
                contact: '01988-901234',
                openingHours: '10:00 AM - 9:30 PM',
                description: 'Authentic Bangladeshi handicrafts and traditional wear. Supporting local artisans.'
            }
        ]
    },
    {
        marketName: 'Gausia Market',
        vendors: [
            {
                name: 'Gadget Hub',
                stallNo: '2nd Floor, Stall 8',
                products: ['Mobile Accessories', 'Power Banks', 'Cables', 'Chargers', 'Bluetooth Speakers'],
                priceRange: 'Affordable',
                rating: 4.3,
                isVerified: true,
                contact: '01799-012345',
                openingHours: '10:30 AM - 8:00 PM',
                description: 'One-stop shop for all mobile accessories. Best prices in town.'
            },
            {
                name: 'Mobile Palace',
                stallNo: '1st Floor, Stall 15',
                products: ['Smartphones', 'Tablets', 'Smartwatches', 'Used Phones'],
                priceRange: 'Mid-range',
                rating: 4.6,
                isVerified: true,
                contact: '01800-123456',
                openingHours: '11:00 AM - 8:30 PM',
                description: 'New and used smartphones with warranty. Trade-in available.'
            }
        ]
    },
    {
        marketName: 'Dhanmondi Food Street',
        vendors: [
            {
                name: 'Star Kebab',
                stallNo: 'Food Stall 5',
                products: ['Chicken Kebab', 'Beef Kebab', 'Naan', 'Salad', 'Soft Drinks'],
                priceRange: 'Mid-range',
                rating: 4.6,
                isVerified: true,
                contact: '01711-234567',
                openingHours: '4:00 PM - 11:00 PM',
                description: 'Famous for authentic Mughlai kebabs. Secret spice recipe since 1995.'
            },
            {
                name: 'Fuchka House',
                stallNo: 'Food Stall 12',
                products: ['Fuchka', 'Chotpoti', 'Jhalmuri', 'Bhel Puri'],
                priceRange: 'Affordable',
                rating: 4.5,
                isVerified: true,
                contact: '01822-345678',
                openingHours: '3:00 PM - 10:30 PM',
                description: 'Best fuchka in Dhanmondi. Clean and hygienic preparation.'
            }
        ]
    }
];

async function updateVendors() {
    console.log('🚀 Updating vendors with complete data...\n');

    try {
        // Get all markets
        const response = await axios.get('http://localhost:3000/api/markets');
        const markets = response.data.data;

        let updated = 0;

        for (const item of marketsWithCompleteVendors) {
            const market = markets.find(m =>
                m.name.toLowerCase() === item.marketName.toLowerCase()
            );

            if (market) {
                // Merge existing vendors with new data
                const existingVendors = market.vendorsList || [];
                const newVendors = item.vendors;

                // Update or add vendors
                const updatedVendors = newVendors.map(newVendor => {
                    const existing = existingVendors.find(v => v.name === newVendor.name);
                    return { ...existing, ...newVendor };
                });

                await axios.patch(`http://localhost:3000/api/markets/${market._id}`, {
                    vendorsList: updatedVendors
                });
                console.log(`✅ Updated vendors for: ${item.marketName}`);
                updated++;
            } else {
                console.log(`❌ Market not found: ${item.marketName}`);
            }
        }

        console.log(`\n📊 Summary: Updated ${updated} markets with complete vendor data!`);
        console.log('\n🎉 Done!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updateVendors();
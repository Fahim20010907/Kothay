// add-vendors-to-markets.js - Run once, only adds vendors, doesn't delete anything
const axios = require('axios');

const marketsWithVendors = [
    {
        marketName: 'New Market',
        vendors: [
            {
                name: 'Rupa Electronics',
                stallNo: '1st Floor, Stall 12',
                products: ['Mobile', 'Laptop', 'Headphones', 'Power Bank'],
                priceRange: 'Mid-range',
                rating: 4.5,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'New Market Book Center',
                stallNo: 'Ground Floor, Stall 45',
                products: ['Academic Books', 'Novels', 'Stationery', 'Magazines'],
                priceRange: 'Affordable',
                rating: 4.2,
                isVerified: false,
                contact: '018xx-xxxxxx'
            },
            {
                name: 'Fashion Gallery',
                stallNo: '2nd Floor, Stall 23',
                products: ['Men\'s Shirts', 'Pants', 'Accessories'],
                priceRange: 'Affordable',
                rating: 4.0,
                isVerified: false,
                contact: '019xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Gausia Market',
        vendors: [
            {
                name: 'Gadget Hub',
                stallNo: '2nd Floor, Stall 8',
                products: ['Mobile Accessories', 'Power Banks', 'Cables', 'Chargers'],
                priceRange: 'Affordable',
                rating: 4.3,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Mobile Palace',
                stallNo: '1st Floor, Stall 15',
                products: ['Smartphones', 'Tablets', 'Smartwatches'],
                priceRange: 'Mid-range',
                rating: 4.6,
                isVerified: true,
                contact: '018xx-xxxxxx'
            },
            {
                name: 'Tech Solution',
                stallNo: '3rd Floor, Stall 32',
                products: ['Laptop Repair', 'Computer Parts', 'Software'],
                priceRange: 'Mid-range',
                rating: 4.1,
                isVerified: false,
                contact: '019xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Bashundhara City',
        vendors: [
            {
                name: 'Apple Premium Reseller',
                stallNo: 'Level 3, Shop 101',
                products: ['iPhone', 'MacBook', 'iPad', 'Apple Watch'],
                priceRange: 'Premium',
                rating: 4.8,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Samsung Experience',
                stallNo: 'Level 3, Shop 105',
                products: ['Galaxy Phones', 'Tablets', 'Smartwatches'],
                priceRange: 'Premium',
                rating: 4.7,
                isVerified: true,
                contact: '018xx-xxxxxx'
            },
            {
                name: 'Aarong',
                stallNo: 'Level 2, Shop 50',
                products: ['Traditional Clothing', 'Handicrafts', 'Home Decor'],
                priceRange: 'Mid-range',
                rating: 4.5,
                isVerified: true,
                contact: '019xx-xxxxxx'
            },
            {
                name: 'Pizza Hut',
                stallNo: 'Level 6, Food Court',
                products: ['Pizza', 'Pasta', 'Wings', 'Beverages'],
                priceRange: 'Mid-range',
                rating: 4.3,
                isVerified: true,
                contact: '017xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Chadni Chowk',
        vendors: [
            {
                name: 'Mobile Bazar',
                stallNo: 'Ground Floor, Shop 5',
                products: ['Mobile Phones', 'Accessories', 'Covers'],
                priceRange: 'Affordable',
                rating: 4.2,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Repair Pro',
                stallNo: '1st Floor, Shop 12',
                products: ['Mobile Repair', 'Screen Replacement', 'Battery Change'],
                priceRange: 'Affordable',
                rating: 4.0,
                isVerified: false,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Kawran Bazar',
        vendors: [
            {
                name: 'Fresh Vegetable Market',
                stallNo: 'Block A, Stall 1-50',
                products: ['Fresh Vegetables', 'Fruits', 'Herbs'],
                priceRange: 'Affordable',
                rating: 4.2,
                isVerified: false,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Fish Market',
                stallNo: 'Block B, Stall 20-40',
                products: ['Fresh Fish', 'Shrimp', 'Crab'],
                priceRange: 'Affordable',
                rating: 4.3,
                isVerified: false,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Dhanmondi Food Street',
        vendors: [
            {
                name: 'Star Kebab',
                stallNo: 'Food Stall 5',
                products: ['Chicken Kebab', 'Beef Kebab', 'Naan'],
                priceRange: 'Mid-range',
                rating: 4.6,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Fuchka House',
                stallNo: 'Food Stall 12',
                products: ['Fuchka', 'Chotpoti', 'Jhalmuri'],
                priceRange: 'Affordable',
                rating: 4.5,
                isVerified: true,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Elephant Road Electronics',
        vendors: [
            {
                name: 'Computer Village',
                stallNo: 'Ground Floor, Shop 20',
                products: ['Desktop', 'Laptop', 'Monitor', 'Keyboard'],
                priceRange: 'Mid-range',
                rating: 4.4,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Gaming Zone',
                stallNo: '1st Floor, Shop 35',
                products: ['Gaming PC', 'Console', 'Accessories'],
                priceRange: 'Premium',
                rating: 4.6,
                isVerified: true,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Mirpur 10 Clothing Market',
        vendors: [
            {
                name: 'Fashion Hub',
                stallNo: 'Ground Floor, Shop 15',
                products: ['Men\'s Fashion', 'Casual Wear', 'Jeans'],
                priceRange: 'Affordable',
                rating: 4.1,
                isVerified: false,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Women\'s Collection',
                stallNo: '1st Floor, Shop 28',
                products: ['Saree', 'Salwar Kameez', 'Accessories'],
                priceRange: 'Affordable',
                rating: 4.3,
                isVerified: true,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Old Dhaka Street Food',
        vendors: [
            {
                name: 'Haji Biriyani',
                stallNo: 'Main Road, Stall 1',
                products: ['Mutton Biriyani', 'Beef Tehari', 'Borhani'],
                priceRange: 'Mid-range',
                rating: 4.9,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Royal Fuchka',
                stallNo: 'Side Lane, Stall 8',
                products: ['Fuchka', 'Chotpoti', 'Pani Puri'],
                priceRange: 'Affordable',
                rating: 4.7,
                isVerified: true,
                contact: '018xx-xxxxxx'
            }
        ]
    },
    {
        marketName: 'Rapa Plaza',
        vendors: [
            {
                name: 'Mobile Station',
                stallNo: 'Ground Floor, Shop 8',
                products: ['Smartphones', 'Accessories', 'Covers'],
                priceRange: 'Mid-range',
                rating: 4.3,
                isVerified: true,
                contact: '017xx-xxxxxx'
            },
            {
                name: 'Laptop House',
                stallNo: '1st Floor, Shop 22',
                products: ['Laptop', 'Accessories', 'Bag'],
                priceRange: 'Mid-range',
                rating: 4.2,
                isVerified: false,
                contact: '018xx-xxxxxx'
            }
        ]
    }
];

async function addVendorsToMarkets() {
    console.log('🚀 Starting to add vendors to markets...\n');

    try {
        // First, test if markets API is working
        console.log('📡 Testing API connection...');
        const testResponse = await axios.get('http://localhost:3000/api/markets');
        console.log('✅ API is working! Found', testResponse.data.data.length, 'markets\n');

        const markets = testResponse.data.data;
        let updated = 0;
        let skipped = 0;
        let notFound = [];

        for (const item of marketsWithVendors) {
            const market = markets.find(m =>
                m.name.toLowerCase() === item.marketName.toLowerCase()
            );

            if (market) {
                // Check if market already has vendors
                if (market.vendorsList && market.vendorsList.length > 0) {
                    console.log(`⚠️  ${item.marketName} already has ${market.vendorsList.length} vendors. Skipping.`);
                    skipped++;
                } else {
                    try {
                        await axios.patch(
                            `http://localhost:3000/api/markets/${market._id}`,
                            { vendorsList: item.vendors }
                        );
                        console.log(`✅ Added ${item.vendors.length} vendors to: ${item.marketName}`);
                        updated++;
                    } catch (patchError) {
                        console.log(`❌ Failed to update ${item.marketName}`);
                        console.log(`   Error:`, patchError.response?.data?.message || patchError.message);
                    }
                }
            } else {
                console.log(`❌ Market not found: ${item.marketName}`);
                notFound.push(item.marketName);
            }
        }

        console.log('\n📊 Summary:');
        console.log(`   ✅ Updated markets: ${updated}`);
        console.log(`   ⚠️  Skipped (already had vendors): ${skipped}`);
        console.log(`   ❌ Not found: ${notFound.length}`);

        if (notFound.length > 0) {
            console.log('\n📍 Missing markets:');
            notFound.forEach(name => console.log(`   - ${name}`));
        }

        console.log('\n🎉 Done! No existing data was harmed.');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('   Make sure your backend server is running on port 3000');
        }
    }
}

addVendorsToMarkets();
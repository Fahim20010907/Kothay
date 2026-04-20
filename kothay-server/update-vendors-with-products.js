// update-vendors-with-products.js
const axios = require('axios');

const marketsWithVendorProducts = [
    {
        marketName: 'Chadni Chowk',
        vendors: [
            {
                name: 'Mobile Bazar',
                stallNo: 'Ground Floor, Shop 5',
                category: 'Electronics',
                rating: 4.2,
                isVerified: true,
                description: 'One-stop shop for all mobile accessories. Quality products at reasonable prices. Specializes in smartphone covers, screen protectors, and original chargers.',
                products: [
                    { name: 'Phone Cover', price: '200-500 BDT' },
                    { name: 'Tempered Glass', price: '150 BDT' },
                    { name: 'Fast Charger', price: '400 BDT' },
                    { name: 'Power Bank', price: '1200 BDT' },
                    { name: 'Earphones', price: '300 BDT' }
                ],
                contact: '01711-123456',
                openingHours: '11:00 AM - 8:00 PM'
            },
            {
                name: 'Repair Pro',
                stallNo: '1st Floor, Shop 12',
                category: 'Mobile Repair',
                rating: 4.0,
                isVerified: false,
                description: 'Expert mobile repair service with quick turnaround. Specializes in iPhone and Samsung repairs. Free diagnosis.',
                products: [
                    { name: 'Screen Replacement', price: '1500-8000 BDT' },
                    { name: 'Battery Change', price: '800-2500 BDT' },
                    { name: 'Water Damage Repair', price: '1000-3000 BDT' },
                    { name: 'Charging Port Fix', price: '500-1200 BDT' }
                ],
                contact: '01822-345678',
                openingHours: '10:00 AM - 7:00 PM'
            }
        ]
    },
    {
        marketName: 'New Market',
        vendors: [
            {
                name: 'Rupa Electronics',
                stallNo: '1st Floor, Stall 12',
                category: 'Electronics',
                rating: 4.5,
                isVerified: true,
                description: 'Authorized reseller of major electronics brands. Best place for quality electronics with warranty. Genuine products guaranteed.',
                products: [
                    { name: 'Mobile', price: '15000-50000 BDT' },
                    { name: 'Laptop', price: '40000-120000 BDT' },
                    { name: 'Headphones', price: '800-5000 BDT' },
                    { name: 'Power Bank', price: '1000-3000 BDT' },
                    { name: 'Smartwatch', price: '3000-15000 BDT' }
                ],
                contact: '01933-456789',
                openingHours: '10:30 AM - 9:00 PM'
            },
            {
                name: 'New Market Book Center',
                stallNo: 'Ground Floor, Stall 45',
                category: 'Books & Stationery',
                rating: 4.2,
                isVerified: false,
                description: 'Vast collection of academic and general books. Special discounts for students. Home delivery available.',
                products: [
                    { name: 'Academic Books', price: '200-1000 BDT' },
                    { name: 'Novels', price: '300-800 BDT' },
                    { name: 'Stationery', price: '10-500 BDT' },
                    { name: 'Magazines', price: '150-300 BDT' },
                    { name: 'Children Books', price: '100-400 BDT' }
                ],
                contact: '01744-567890',
                openingHours: '10:00 AM - 8:30 PM'
            },
            {
                name: 'Rahim Shoes Corner',
                stallNo: '2nd Floor, Stall 23',
                category: 'Shoes',
                rating: 4.0,
                isVerified: false,
                description: 'Affordable shoes for men and women. Quality footwear at budget prices. School shoes available.',
                products: [
                    { name: 'Sneakers', price: '1200 BDT' },
                    { name: 'Leather Shoes', price: '2500 BDT' },
                    { name: 'Sandals', price: '700 BDT' },
                    { name: 'School Shoes', price: '900 BDT' },
                    { name: 'Sports Shoes', price: '1800 BDT' }
                ],
                contact: '01855-678901',
                openingHours: '11:00 AM - 9:00 PM'
            }
        ]
    },
    {
        marketName: 'Bashundhara City',
        vendors: [
            {
                name: 'Apple Premium Reseller',
                stallNo: 'Level 3, Shop 101',
                category: 'Electronics',
                rating: 4.8,
                isVerified: true,
                description: 'Official Apple authorized reseller. Genuine products with official warranty. EMI options available.',
                products: [
                    { name: 'iPhone', price: '65000-165000 BDT' },
                    { name: 'MacBook', price: '120000-300000 BDT' },
                    { name: 'iPad', price: '45000-120000 BDT' },
                    { name: 'Apple Watch', price: '30000-80000 BDT' },
                    { name: 'AirPods', price: '15000-25000 BDT' }
                ],
                contact: '01766-789012',
                openingHours: '10:00 AM - 10:00 PM'
            },
            {
                name: 'Aarong',
                stallNo: 'Level 2, Shop 50',
                category: 'Fashion & Handicrafts',
                rating: 4.5,
                isVerified: true,
                description: 'Authentic Bangladeshi handicrafts and traditional wear. Supporting local artisans since 1978.',
                products: [
                    { name: 'Traditional Clothing', price: '1500-8000 BDT' },
                    { name: 'Handicrafts', price: '300-5000 BDT' },
                    { name: 'Home Decor', price: '500-10000 BDT' },
                    { name: 'Jewelry', price: '1000-15000 BDT' },
                    { name: 'Gifts', price: '200-3000 BDT' }
                ],
                contact: '01988-901234',
                openingHours: '10:00 AM - 9:30 PM'
            }
        ]
    },
    {
        marketName: 'Gausia Market',
        vendors: [
            {
                name: 'Mobile Palace',
                stallNo: '1st Floor, Stall 15',
                category: 'Electronics',
                rating: 4.6,
                isVerified: true,
                description: 'New and used smartphones with warranty. Trade-in available. Best prices in town.',
                products: [
                    { name: 'New Smartphones', price: '10000-60000 BDT' },
                    { name: 'Used Phones', price: '5000-30000 BDT' },
                    { name: 'Tablets', price: '15000-45000 BDT' },
                    { name: 'Smartwatches', price: '2500-12000 BDT' }
                ],
                contact: '01800-123456',
                openingHours: '11:00 AM - 8:30 PM'
            }
        ]
    },
    {
        marketName: 'Rapa Plaza',
        vendors: [
            {
                name: 'Laptop House',
                stallNo: '1st Floor, Shop 22',
                category: 'Electronics',
                rating: 4.2,
                isVerified: false,
                description: 'Authorized laptop retailer offering the latest models from top brands. Specializes in gaming laptops, ultrabooks, and professional workstations. All products come with official warranty.',
                products: [
                    { name: 'Gaming Laptop', price: '80000-200000 BDT' },
                    { name: 'Business Laptop', price: '50000-120000 BDT' },
                    { name: 'Laptop Bag', price: '800-3000 BDT' },
                    { name: 'Laptop Accessories', price: '500-5000 BDT' },
                    { name: 'External Hard Drive', price: '4500-12000 BDT' }
                ],
                contact: '018xx-xxxxxx',
                openingHours: '10:30 AM - 8:00 PM'
            }
        ]
    }
];

async function updateVendors() {
    console.log('🚀 Updating vendors with products and complete info...\n');

    try {
        const response = await axios.get('http://localhost:3000/api/markets');
        const markets = response.data.data;

        let updated = 0;

        for (const item of marketsWithVendorProducts) {
            const market = markets.find(m =>
                m.name.toLowerCase() === item.marketName.toLowerCase()
            );

            if (market) {
                // Get existing vendors
                const existingVendors = market.vendorsList || [];

                // Update or add vendors with complete data
                const updatedVendors = item.vendors.map(newVendor => {
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
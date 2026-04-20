// update-all-vendors.js - Complete vendor data for ALL markets
const axios = require('axios');

const allMarketsWithVendors = [
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
                    { name: 'Smartphone', price: '15000-50000 BDT' },
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
            },
            {
                name: 'Fashion Gallery',
                stallNo: '2nd Floor, Stall 23',
                category: 'Clothing',
                rating: 4.1,
                isVerified: false,
                description: 'Latest fashion trends at affordable prices. Quality fabrics and perfect fitting.',
                products: [
                    { name: "Men's Shirts", price: '800-2000 BDT' },
                    { name: "Men's Pants", price: '1000-2500 BDT' },
                    { name: "Women's Dresses", price: '1200-3000 BDT' },
                    { name: 'Accessories', price: '200-800 BDT' }
                ],
                contact: '01966-789012',
                openingHours: '11:00 AM - 9:00 PM'
            }
        ]
    },
    {
        marketName: 'Gausia Market',
        vendors: [
            {
                name: 'Gadget Hub',
                stallNo: '2nd Floor, Stall 8',
                category: 'Electronics',
                rating: 4.3,
                isVerified: true,
                description: 'One-stop shop for all mobile accessories. Best prices in town.',
                products: [
                    { name: 'Mobile Accessories', price: '50-1000 BDT' },
                    { name: 'Power Banks', price: '800-2500 BDT' },
                    { name: 'Cables', price: '100-500 BDT' },
                    { name: 'Chargers', price: '300-1000 BDT' },
                    { name: 'Bluetooth Speakers', price: '1000-5000 BDT' }
                ],
                contact: '01799-012345',
                openingHours: '10:30 AM - 8:00 PM'
            },
            {
                name: 'Mobile Palace',
                stallNo: '1st Floor, Stall 15',
                category: 'Electronics',
                rating: 4.6,
                isVerified: true,
                description: 'New and used smartphones with warranty. Trade-in available.',
                products: [
                    { name: 'New Smartphones', price: '10000-60000 BDT' },
                    { name: 'Used Phones', price: '5000-30000 BDT' },
                    { name: 'Tablets', price: '15000-45000 BDT' },
                    { name: 'Smartwatches', price: '2500-12000 BDT' }
                ],
                contact: '01800-123456',
                openingHours: '11:00 AM - 8:30 PM'
            },
            {
                name: 'Tech Solution',
                stallNo: '3rd Floor, Stall 32',
                category: 'Laptop Repair',
                rating: 4.1,
                isVerified: false,
                description: 'Professional laptop repair service. Fast and reliable.',
                products: [
                    { name: 'Laptop Repair', price: '500-3000 BDT' },
                    { name: 'Computer Parts', price: '500-10000 BDT' },
                    { name: 'Software Installation', price: '300-1000 BDT' }
                ],
                contact: '01911-223344',
                openingHours: '10:00 AM - 7:00 PM'
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
                description: 'Official Apple authorized reseller. Genuine products with official warranty.',
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
                name: 'Samsung Experience',
                stallNo: 'Level 3, Shop 105',
                category: 'Electronics',
                rating: 4.7,
                isVerified: true,
                description: 'Official Samsung experience store. Try and buy latest Samsung products.',
                products: [
                    { name: 'Galaxy Phones', price: '25000-120000 BDT' },
                    { name: 'Tablets', price: '20000-80000 BDT' },
                    { name: 'Smartwatches', price: '8000-40000 BDT' },
                    { name: 'TV', price: '40000-200000 BDT' }
                ],
                contact: '01877-890123',
                openingHours: '10:00 AM - 10:00 PM'
            },
            {
                name: 'Aarong',
                stallNo: 'Level 2, Shop 50',
                category: 'Fashion & Handicrafts',
                rating: 4.5,
                isVerified: true,
                description: 'Authentic Bangladeshi handicrafts and traditional wear. Supporting local artisans.',
                products: [
                    { name: 'Traditional Clothing', price: '1500-8000 BDT' },
                    { name: 'Handicrafts', price: '300-5000 BDT' },
                    { name: 'Home Decor', price: '500-10000 BDT' },
                    { name: 'Jewelry', price: '1000-15000 BDT' },
                    { name: 'Gifts', price: '200-3000 BDT' }
                ],
                contact: '01988-901234',
                openingHours: '10:00 AM - 9:30 PM'
            },
            {
                name: 'Pizza Hut',
                stallNo: 'Level 6, Food Court',
                category: 'Food',
                rating: 4.3,
                isVerified: true,
                description: 'Famous pizza chain offering delicious pizzas, pasta, and wings.',
                products: [
                    { name: 'Pizza', price: '500-2000 BDT' },
                    { name: 'Pasta', price: '300-600 BDT' },
                    { name: 'Wings', price: '400-800 BDT' },
                    { name: 'Beverages', price: '50-150 BDT' }
                ],
                contact: '01777-123456',
                openingHours: '11:00 AM - 11:00 PM'
            }
        ]
    },
    {
        marketName: 'Chadni Chowk',
        vendors: [
            {
                name: 'Mobile Bazar',
                stallNo: 'Ground Floor, Shop 5',
                category: 'Electronics',
                rating: 4.2,
                isVerified: true,
                description: 'One-stop shop for all mobile accessories. Quality products at reasonable prices.',
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
                description: 'Expert mobile repair service with quick turnaround.',
                products: [
                    { name: 'Screen Replacement', price: '1500-8000 BDT' },
                    { name: 'Battery Change', price: '800-2500 BDT' },
                    { name: 'Water Damage Repair', price: '1000-3000 BDT' }
                ],
                contact: '01822-345678',
                openingHours: '10:00 AM - 7:00 PM'
            }
        ]
    },
    {
        marketName: 'Kawran Bazar',
        vendors: [
            {
                name: 'Fresh Vegetable Market',
                stallNo: 'Block A, Stall 1-50',
                category: 'Groceries',
                rating: 4.2,
                isVerified: false,
                description: 'Fresh vegetables and fruits directly from farmers.',
                products: [
                    { name: 'Fresh Vegetables', price: '20-200 BDT' },
                    { name: 'Fruits', price: '50-500 BDT' },
                    { name: 'Herbs', price: '10-50 BDT' }
                ],
                contact: '01711-334455',
                openingHours: '6:00 AM - 8:00 PM'
            },
            {
                name: 'Fish Market',
                stallNo: 'Block B, Stall 20-40',
                category: 'Groceries',
                rating: 4.3,
                isVerified: false,
                description: 'Fresh fish and seafood available daily.',
                products: [
                    { name: 'Fresh Fish', price: '200-1000 BDT' },
                    { name: 'Shrimp', price: '500-1500 BDT' },
                    { name: 'Crab', price: '400-800 BDT' }
                ],
                contact: '01822-445566',
                openingHours: '6:00 AM - 7:00 PM'
            }
        ]
    },
    {
        marketName: 'Dhanmondi Food Street',
        vendors: [
            {
                name: 'Star Kebab',
                stallNo: 'Food Stall 5',
                category: 'Food',
                rating: 4.6,
                isVerified: true,
                description: 'Famous for authentic Mughlai kebabs. Secret spice recipe since 1995.',
                products: [
                    { name: 'Chicken Kebab', price: '250 BDT' },
                    { name: 'Beef Kebab', price: '300 BDT' },
                    { name: 'Naan', price: '30 BDT' },
                    { name: 'Soft Drinks', price: '30-50 BDT' }
                ],
                contact: '01711-234567',
                openingHours: '4:00 PM - 11:00 PM'
            },
            {
                name: 'Fuchka House',
                stallNo: 'Food Stall 12',
                category: 'Food',
                rating: 4.5,
                isVerified: true,
                description: 'Best fuchka in Dhanmondi. Clean and hygienic preparation.',
                products: [
                    { name: 'Fuchka', price: '60 BDT (6 pcs)' },
                    { name: 'Chotpoti', price: '50 BDT' },
                    { name: 'Jhalmuri', price: '30 BDT' },
                    { name: 'Bhel Puri', price: '50 BDT' }
                ],
                contact: '01822-345678',
                openingHours: '3:00 PM - 10:30 PM'
            },
            {
                name: 'Cafe Bari',
                stallNo: 'Food Stall 8',
                category: 'Cafe',
                rating: 4.4,
                isVerified: true,
                description: 'Cozy café with great ambiance and quality snacks.',
                products: [
                    { name: 'Coffee', price: '120-250 BDT' },
                    { name: 'Sandwich', price: '150-300 BDT' },
                    { name: 'Pasta', price: '250-400 BDT' },
                    { name: 'Cake', price: '150-300 BDT' }
                ],
                contact: '01933-456789',
                openingHours: '8:00 AM - 12:00 AM'
            }
        ]
    },
    {
        marketName: 'Elephant Road Electronics',
        vendors: [
            {
                name: 'Computer Village',
                stallNo: 'Ground Floor, Shop 20',
                category: 'Electronics',
                rating: 4.4,
                isVerified: true,
                description: 'Complete computer solution provider.',
                products: [
                    { name: 'Desktop', price: '30000-80000 BDT' },
                    { name: 'Laptop', price: '40000-120000 BDT' },
                    { name: 'Monitor', price: '12000-30000 BDT' },
                    { name: 'Keyboard', price: '500-3000 BDT' }
                ],
                contact: '01711-556677',
                openingHours: '10:00 AM - 8:00 PM'
            },
            {
                name: 'Gaming Zone',
                stallNo: '1st Floor, Shop 35',
                category: 'Gaming',
                rating: 4.6,
                isVerified: true,
                description: 'Premium gaming PCs and accessories.',
                products: [
                    { name: 'Gaming PC', price: '80000-200000 BDT' },
                    { name: 'Console', price: '35000-50000 BDT' },
                    { name: 'Gaming Accessories', price: '1000-15000 BDT' }
                ],
                contact: '01822-667788',
                openingHours: '11:00 AM - 8:00 PM'
            }
        ]
    },
    {
        marketName: 'Mirpur 10 Clothing Market',
        vendors: [
            {
                name: 'Fashion Hub',
                stallNo: 'Ground Floor, Shop 15',
                category: 'Clothing',
                rating: 4.1,
                isVerified: false,
                description: "Men's fashion destination. Latest trends at affordable prices.",
                products: [
                    { name: "Men's Shirts", price: '700-1500 BDT' },
                    { name: "Men's Pants", price: '800-2000 BDT' },
                    { name: "Men's Jeans", price: '1000-2500 BDT' }
                ],
                contact: '01733-445566',
                openingHours: '11:00 AM - 9:00 PM'
            },
            {
                name: "Women's Collection",
                stallNo: '1st Floor, Shop 28',
                category: 'Clothing',
                rating: 4.3,
                isVerified: true,
                description: 'Traditional and modern women clothing.',
                products: [
                    { name: 'Saree', price: '1500-8000 BDT' },
                    { name: 'Salwar Kameez', price: '1200-5000 BDT' },
                    { name: 'Accessories', price: '200-1000 BDT' }
                ],
                contact: '01844-556677',
                openingHours: '10:00 AM - 8:30 PM'
            }
        ]
    },
    {
        marketName: 'Old Dhaka Street Food',
        vendors: [
            {
                name: 'Haji Biriyani',
                stallNo: 'Main Road, Stall 1',
                category: 'Food',
                rating: 4.9,
                isVerified: true,
                description: 'Legendary biriyani spot since 1939. Famous for authentic Old Dhaka style biriyani.',
                products: [
                    { name: 'Mutton Biriyani', price: '350 BDT' },
                    { name: 'Beef Tehari', price: '250 BDT' },
                    { name: 'Borhani', price: '40 BDT' }
                ],
                contact: '01711-123456',
                openingHours: '12:00 PM - 9:00 PM'
            },
            {
                name: 'Royal Fuchka',
                stallNo: 'Side Lane, Stall 8',
                category: 'Food',
                rating: 4.7,
                isVerified: true,
                description: 'Authentic Old Dhaka style fuchka and chaat.',
                products: [
                    { name: 'Fuchka', price: '50 BDT' },
                    { name: 'Chotpoti', price: '40 BDT' },
                    { name: 'Pani Puri', price: '50 BDT' }
                ],
                contact: '01822-345678',
                openingHours: '3:00 PM - 10:00 PM'
            }
        ]
    },
    {
        marketName: 'Rapa Plaza',
        vendors: [
            {
                name: 'Mobile Station',
                stallNo: 'Ground Floor, Shop 8',
                category: 'Electronics',
                rating: 4.3,
                isVerified: true,
                description: 'Latest smartphones and accessories at competitive prices.',
                products: [
                    { name: 'Smartphones', price: '10000-55000 BDT' },
                    { name: 'Accessories', price: '100-2000 BDT' },
                    { name: 'Phone Covers', price: '200-800 BDT' }
                ],
                contact: '01711-778899',
                openingHours: '10:30 AM - 8:30 PM'
            },
            {
                name: 'Laptop House',
                stallNo: '1st Floor, Shop 22',
                category: 'Electronics',
                rating: 4.2,
                isVerified: false,
                description: 'Authorized laptop retailer. Gaming laptops, ultrabooks, and professional workstations.',
                products: [
                    { name: 'Gaming Laptop', price: '80000-200000 BDT' },
                    { name: 'Business Laptop', price: '50000-120000 BDT' },
                    { name: 'Laptop Bag', price: '800-3000 BDT' },
                    { name: 'External Hard Drive', price: '4500-12000 BDT' }
                ],
                contact: '01822-990011',
                openingHours: '10:30 AM - 8:00 PM'
            }
        ]
    }
];

async function updateAllVendors() {
    console.log('🚀 Updating ALL vendors with complete data...\n');

    try {
        const response = await axios.get('http://localhost:3000/api/markets');
        const markets = response.data.data;

        let updated = 0;

        for (const item of allMarketsWithVendors) {
            const market = markets.find(m =>
                m.name.toLowerCase() === item.marketName.toLowerCase()
            );

            if (market) {
                await axios.patch(`http://localhost:3000/api/markets/${market._id}`, {
                    vendorsList: item.vendors
                });
                console.log(`✅ Updated ${item.vendors.length} vendors for: ${item.marketName}`);
                updated++;
            } else {
                console.log(`❌ Market not found: ${item.marketName}`);
            }
        }

        console.log(`\n📊 Summary: Updated ${updated} markets with COMPLETE vendor data!`);
        console.log('\n🎉 Done! Now every vendor has full information including products, prices, and descriptions.');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updateAllVendors();
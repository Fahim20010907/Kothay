// seed.js
const axios = require('axios');

const marketsData = [
    {
        name: 'New Market',
        category: 'clothing',
        subCategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Shoes', 'Accessories'],
        location: 'Shahbagh, Dhaka',
        area: 'Shahbagh',
        rating: 4.5,
        reviews: 0,
        priceLevel: 'Affordable',
        openingHours: '10:00 AM - 8:00 PM',
        vendors: 120,
        description: 'One of Dhaka\'s oldest and busiest markets for clothing and accessories',
        popularProducts: ['Shirts', 'Pants', 'Shoes', 'Watches'],
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/87/35/67/caption.jpg?w=1200&h=1200&s=1'
    },
    {
        name: 'Gausia Market',
        category: 'electronics',
        subCategories: ['Laptops', 'Mobile Phones', 'Accessories', 'Cameras'],
        location: 'Elephant Road, Dhaka',
        area: 'Elephant Road',
        rating: 4.3,
        reviews: 0,
        priceLevel: 'Mid-range',
        openingHours: '10:00 AM - 9:00 PM',
        vendors: 85,
        description: 'Famous electronics market with competitive prices',
        popularProducts: ['Laptop', 'Mobile', 'Headphones', 'Power Bank'],
        image: 'https://propertyguide-store.s3.ap-southeast-1.amazonaws.com/bikroy/Gausia_Market_65eb5b2f12.jpg'
    },
    {
        name: 'Bashundhara City',
        category: 'clothing',
        subCategories: ['Brands', 'Fashion', 'Electronics', 'Food Court'],
        location: 'Panthapath, Dhaka',
        area: 'Panthapath',
        rating: 4.7,
        reviews: 0,
        priceLevel: 'Premium',
        openingHours: '10:00 AM - 10:00 PM',
        vendors: 250,
        description: 'Largest shopping mall in Bangladesh with international brands',
        popularProducts: ['Clothing', 'Electronics', 'Shoes', 'Cosmetics'],
        image: 'https://live.staticflickr.com/4072/4327366377_5e1c146e69_c.jpg'
    },
    {
        name: 'Chadni Chowk',
        category: 'electronics',
        subCategories: ['Mobile Phones', 'Accessories', 'Repair Services'],
        location: 'Motijheel, Dhaka',
        area: 'Motijheel',
        rating: 4.2,
        reviews: 0,
        priceLevel: 'Affordable',
        openingHours: '10:00 AM - 7:00 PM',
        vendors: 95,
        description: 'Go-to place for mobile phones and accessories',
        popularProducts: ['Mobile', 'Cases', 'Chargers', 'Screen Protectors'],
        image: 'https://i.ytimg.com/vi/xLudwDmwDdM/sddefault.jpg'
    },
    {
        name: 'Kawran Bazar',
        category: 'grocery',
        subCategories: ['Fresh Vegetables', 'Fruits', 'Fish', 'Meat'],
        location: 'Kawran Bazar, Dhaka',
        area: 'Kawran Bazar',
        rating: 4.0,
        reviews: 0,
        priceLevel: 'Affordable',
        openingHours: '6:00 AM - 8:00 PM',
        vendors: 200,
        description: 'Largest wholesale and retail market for fresh produce',
        popularProducts: ['Vegetables', 'Fruits', 'Fish', 'Spices'],
        image: 'https://cdn.bdnews24.com/bdnews24/media/bdnews24-english/2024-04/079986de-7bfb-4835-ac11-7cd719e69c2a/fruit_market_kawran_bazar_170324_018.jpg'
    },
    {
        name: 'Dhanmondi Food Street',
        category: 'street-food',
        subCategories: ['Fuchka', 'Biriyani', 'Chaat', 'Bakery'],
        location: 'Dhanmondi 27, Dhaka',
        area: 'Dhanmondi',
        rating: 4.6,
        reviews: 0,
        priceLevel: 'Budget',
        openingHours: '3:00 PM - 11:00 PM',
        vendors: 45,
        description: 'Famous street food destination with diverse food options',
        popularProducts: ['Fuchka', 'Chotpoti', 'Burger', 'Coffee'],
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=600&h=400&fit=crop'
    },
    {
        name: 'Elephant Road Electronics',
        category: 'electronics',
        subCategories: ['Laptops', 'Desktops', 'Gadgets', 'Accessories'],
        location: 'Elephant Road, Dhaka',
        area: 'Elephant Road',
        rating: 4.4,
        reviews: 0,
        priceLevel: 'Mid-range',
        openingHours: '10:00 AM - 8:00 PM',
        vendors: 110,
        description: 'Computer and electronics hub with competitive prices',
        popularProducts: ['Laptop', 'Desktop', 'Monitor', 'Keyboard'],
        image: 'https://static.where-e.com/Bangladesh/Dhaka/New_Market/Ryans-Computers-Elephant-Road_adac56196c7719266bc1728499920e6e.jpg'
    },
    {
        name: 'Mirpur 10 Clothing Market',
        category: 'clothing',
        subCategories: ['Casual Wear', 'Formal Wear', 'Kids Wear', 'Shoes'],
        location: 'Mirpur 10, Dhaka',
        area: 'Mirpur',
        rating: 4.1,
        reviews: 0,
        priceLevel: 'Affordable',
        openingHours: '10:00 AM - 8:00 PM',
        vendors: 75,
        description: 'Popular clothing market in Mirpur area',
        popularProducts: ['T-Shirts', 'Pants', 'Jeans', 'Jackets'],
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8WhyHkLuhVdcFmVtisl-N2EYAaiS2DbPjQ&s'
    },
    {
        name: 'Old Dhaka Street Food',
        category: 'street-food',
        subCategories: ['Biriyani', 'Fuchka', 'Kacchi', 'Sweets'],
        location: 'Chawkbazar, Old Dhaka',
        area: 'Old Dhaka',
        rating: 4.8,
        reviews: 0,
        priceLevel: 'Budget',
        openingHours: '12:00 PM - 10:00 PM',
        vendors: 60,
        description: 'Historical street food destination with authentic flavors',
        popularProducts: ['Mutton Biriyani', 'Fuchka', 'Borhani', 'Sweets'],
        image: 'https://ecdn.dhakatribune.net/contents/cache/images/1200x630x1xxxxx1/uploads/dten/2019/07/iftar-puran-dhaka-1562413732082.jpg'
    },
    {
        name: 'Rapa Plaza',
        category: 'electronics',
        subCategories: ['Mobile', 'Laptop', 'Camera', 'Gadgets'],
        location: 'Dhanmondi 4, Dhaka',
        area: 'Dhanmondi',
        rating: 4.3,
        reviews: 0,
        priceLevel: 'Mid-range',
        openingHours: '10:00 AM - 8:00 PM',
        vendors: 90,
        description: 'Popular electronics shopping destination',
        popularProducts: ['Mobile', 'Laptop', 'Tablet', 'Accessories'],
        image: 'https://i.ytimg.com/vi/_rxUS0iflHQ/maxresdefault.jpg'
    }
];

const streetFoodData = [
    {
        name: 'Star Kebab & Biriyani',
        category: 'biriyani',
        location: 'New Market Area',
        area: 'Shahbagh',
        rating: 4.7,
        reviews: 0,

        popularItems: ['Chicken Biriyani', 'Beef Tehari', 'Borhani'],
        openingHours: '11:00 AM - 10:00 PM',
        crowdLevel: 'Busy',
        description: 'Famous for authentic Dhaka-style biriyani since 1995',
        verified: true,
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/a9/7e/86/caption.jpg'
    },
    {
        name: 'Puran Dhaka Fuchka',
        category: 'fuchka',
        location: 'Old Dhaka',
        area: 'Chawkbazar',
        rating: 4.9,
        reviews: 0,

        popularItems: ['Fuchka', 'Chotpoti', 'Jhalmuri'],
        openingHours: '4:00 PM - 11:00 PM',
        crowdLevel: 'Very Busy',
        description: 'Best fuchka in Old Dhaka with secret spice recipe',
        verified: true,
        image: 'https://i.ytimg.com/vi/FmbFrrucVSI/maxresdefault.jpg'
    },
    {
        name: 'Apon Coffee House',
        category: 'tea',
        location: 'Taltola Market',
        area: 'Khilgaon',
        rating: 4.8,
        reviews: 0,

        popularItems: ['Coffee', 'Sandwich', 'Pasta'],
        openingHours: '8:00 AM - 12:00 AM',
        crowdLevel: 'Moderate',
        description: 'Cozy café with great ambiance and quality snacks',
        verified: true,
        image: 'https://i.ytimg.com/vi/3ilscf5NPzs/maxresdefault.jpg'
    },
    {
        name: 'Haji Biriyani',
        category: 'biriyani',
        location: 'Old Dhaka',
        area: 'Chawkbazar',
        rating: 4.8,
        reviews: 0,

        popularItems: ['Mutton Biriyani', 'Borhani'],
        openingHours: '12:00 PM - 9:00 PM',
        crowdLevel: 'Very Busy',
        description: 'Legendary biriyani spot since 1939',
        verified: true,
        image: 'https://content.jdmagicbox.com/comp/kalyani/w8/9999pxx33.xx33.170407135753.p4w8/catalogue/kolkata-haji-biriyani-kalyani-ho-kalyani-restaurants-3qc09tk.jpg'
    },
    {
        name: 'Dhanmondi Chaat House',
        category: 'chaat',
        location: 'Dhanmondi 8',
        area: 'Dhanmondi',
        rating: 4.4,
        reviews: 0,

        popularItems: ['Aloo Chaat', 'Papri Chaat', 'Dahi Vada'],
        openingHours: '3:00 PM - 10:00 PM',
        crowdLevel: 'Busy',
        description: 'Famous for traditional Indian chaat items',
        verified: false,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN9YqWXqxA3v006DGMyapfdA6HKCB1xTr2A&s'
    },
    {
        name: 'Burger King Bangladesh',
        category: 'fast-food',
        location: 'Gulshan Avenue',
        area: 'Gulshan',
        rating: 4.3,
        reviews: 0,

        popularItems: ['Whopper', 'Chicken Burger', 'Fries'],
        openingHours: '10:00 AM - 11:00 PM',
        crowdLevel: 'Moderate',
        description: 'International fast food chain with local favorites',
        verified: true,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/26/4e/94/img-20181010-151407-largejpg.jpg?w=900&h=500&s=1'
    },
    {
        name: 'Salam Dairy Farm',
        category: 'sweets',
        location: 'Bashabo',
        area: 'Mirpur',
        rating: 4.6,
        reviews: 0,

        popularItems: ['Roshogolla', 'Sandesh', 'Mishti Doi'],
        openingHours: '9:00 AM - 10:00 PM',
        crowdLevel: 'Busy',
        description: 'Authentic Bengali sweets since 1980',
        verified: true,
        image: 'https://i.ytimg.com/vi/HBhbvPrgUo8/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGEogXChlMA8=&rs=AOn4CLAP1FqNQRkQy9oTA4007KeUMzAGUw'
    },
    {
        name: 'Nanna Grill',
        category: 'grill',
        location: 'Banani 11',
        area: 'Banani',
        rating: 4.5,
        reviews: 0,

        popularItems: ['Chicken Grill', 'Lamb Chop', 'Kacchi'],
        openingHours: '12:00 PM - 11:00 PM',
        crowdLevel: 'Moderate',
        description: 'Best grilled items in Banani area',
        verified: true,
        image: 'https://eltipoquenuncacenaencasa.com/wp-content/uploads/2020/11/nana-grill-el-tipo-que-nunca-cena-en-casa-1.jpg'
    }
];
// Add after streetFoodData
const reviewsData = [
    {
        stallId: "STALL_ID_1", // You'll need to get actual IDs after seeding
        type: 'street-food',
        userName: 'Rakib Hasan',
        rating: 5,
        comment: 'Best biriyani in town! Must try.',
        createdAt: new Date()
    }
];
async function seedDatabase() {
    try {
        console.log('Seeding markets...');
        const marketsResponse = await axios.post('http://localhost:3000/api/markets/seed', marketsData);
        console.log('Markets seeded:', marketsResponse.data);

        console.log('Seeding street food...');
        const foodResponse = await axios.post('http://localhost:3000/api/street-food/seed', streetFoodData);
        console.log('Street food seeded:', foodResponse.data);

        console.log('✅ Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error.response?.data || error.message);
    }
}

seedDatabase();
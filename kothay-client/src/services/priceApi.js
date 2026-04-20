// src/services/priceApi.js

// Calculate online price based on local price and category
export const calculateOnlinePrice = (localPrice, category) => {
    // Different categories have different markup percentages
    const categoryMarkup = {
        'electronics': 0.15,    // 15% more online
        'clothing': 0.25,       // 25% more online  
        'grocery': 0.10,        // 10% more online
        'shoes': 0.20,          // 20% more online
        'books': 0.10,          // 10% more online
        'default': 0.18         // 18% default
    };
    
    const markup = categoryMarkup[category] || categoryMarkup.default;
    
    // Online price is local price + markup + delivery fee
    const deliveryFee = 50; // Standard delivery fee in BDT
    const onlinePrice = Math.round(localPrice * (1 + markup) + deliveryFee);
    
    return onlinePrice;
};

// Get real-time price from external API (for future implementation)
export const fetchRealTimePrice = async (productName) => {
    // This can be expanded to call actual Daraz API
    // For now, return simulated data
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                daraz: Math.round(Math.random() * 5000 + 1000),
                pickaboo: Math.round(Math.random() * 5000 + 1000),
                appleGadgets: Math.round(Math.random() * 5000 + 1000)
            });
        }, 500);
    });
};
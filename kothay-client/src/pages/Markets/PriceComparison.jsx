// src/pages/Markets/PriceComparison.jsx
import React, { useState } from 'react';
import {
    FiShoppingCart,
    FiRefreshCw,
    FiDollarSign,
    FiTrendingDown,
    FiTrendingUp
} from 'react-icons/fi';

// Calculate online price based on local price and category
const calculateOnlinePrice = (localPrice, category) => {
    // Different categories have different markup percentages
    const categoryMarkup = {
        'electronics': 0.15,    // 15% more online
        'clothing': 0.25,       // 25% more online  
        'grocery': 0.10,        // 10% more online
        'shoes': 0.20,          // 20% more online
        'books': 0.10,          // 10% more online
        'furniture': 0.18,      // 18% more online
        'stationery': 0.12,     // 12% more online
        'default': 0.18         // 18% default
    };

    const markup = categoryMarkup[category] || categoryMarkup.default;

    // Online price is local price + markup + delivery fee
    const deliveryFee = 50; // Standard delivery fee in BDT
    const onlinePrice = Math.round(localPrice * (1 + markup) + deliveryFee);

    return onlinePrice;
};

const PriceComparison = ({ marketName, productName, localPrice, category }) => {
    const [onlinePrice, setOnlinePrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [savings, setSavings] = useState(null);
    const [showComparison, setShowComparison] = useState(false);

    const handleCompare = () => {
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Calculate online price based on local price and category
            const onlinePriceValue = calculateOnlinePrice(localPrice, category);
            setOnlinePrice(onlinePriceValue);

            const difference = localPrice - onlinePriceValue;
            const percentage = Math.abs((difference / localPrice) * 100).toFixed(0);

            setSavings({
                amount: Math.abs(difference),
                percentage: percentage,
                isOnlineCheaper: onlinePriceValue < localPrice,
                isLocalCheaper: localPrice < onlinePriceValue,
                isEqual: onlinePriceValue === localPrice
            });

            setLoading(false);
            setShowComparison(true);
        }, 800);
    };

    const getComparisonMessage = () => {
        if (!savings) return null;

        if (savings.isOnlineCheaper) {
            return {
                message: `Save ৳${savings.amount} (${savings.percentage}%) by shopping online!`,
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                textColor: 'text-green-700',
                buttonColor: 'bg-green-600 hover:bg-green-700',
                icon: '🛒'
            };
        } else if (savings.isLocalCheaper) {
            return {
                message: `Local market is ৳${savings.amount} (${savings.percentage}%) cheaper than online`,
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                textColor: 'text-orange-700',
                buttonColor: 'bg-teal-600 hover:bg-teal-700',
                icon: '📍'
            };
        } else {
            return {
                message: `Same price! Support local vendors at ${marketName}`,
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                textColor: 'text-blue-700',
                buttonColor: 'bg-teal-600 hover:bg-teal-700',
                icon: '🤝'
            };
        }
    };

    const comparison = getComparisonMessage();

    return (
        <div className="mt-4 border-t border-gray-100 pt-4">
            {/* Price Comparison Button */}
            {!showComparison && (
                <button
                    onClick={handleCompare}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Comparing Prices...
                        </>
                    ) : (
                        <>
                            <FiDollarSign className="text-base" />
                            Compare Price with Online Stores
                        </>
                    )}
                </button>
            )}

            {/* Comparison Result */}
            {showComparison && comparison && (
                <div className={`mt-3 p-4 rounded-lg border-2 ${comparison.bgColor} ${comparison.borderColor} transition-all duration-300`}>
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">{comparison.icon}</span>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Price Comparison</p>
                            </div>

                            {/* Product Name */}
                            {productName && (
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Comparing: <span className="font-bold">{productName}</span>
                                </p>
                            )}

                            {/* Price Display */}
                            <div className="flex items-baseline gap-3 mb-3">
                                <div className="flex-1 text-center p-2 bg-white rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500">Local Market</p>
                                    <p className="font-bold text-gray-800 text-lg">৳{localPrice}</p>
                                </div>
                                <span className="text-gray-400 text-sm">vs</span>
                                <div className="flex-1 text-center p-2 bg-white rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500">Online (Daraz)</p>
                                    <p className={`font-bold text-lg ${savings?.isOnlineCheaper ? 'text-green-600' : 'text-gray-800'}`}>
                                        ৳{onlinePrice}
                                    </p>
                                </div>
                            </div>

                            {/* Savings Indicator */}
                            {savings && !savings.isEqual && (
                                <div className={`flex items-center justify-center gap-1 mb-3 text-sm font-medium ${savings.isOnlineCheaper ? 'text-green-600' : 'text-orange-600'}`}>
                                    {savings.isOnlineCheaper ? (
                                        <>
                                            <FiTrendingDown className="text-sm" />
                                            You save ৳{savings.amount} ({savings.percentage}%)
                                        </>
                                    ) : (
                                        <>
                                            <FiTrendingUp className="text-sm" />
                                            Local market is cheaper by ৳{savings.amount}
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Message */}
                            <p className={`text-sm font-medium text-center ${comparison.textColor} mb-3`}>
                                {comparison.message}
                            </p>

                            {/* Action Button */}
                            {savings?.isOnlineCheaper && (
                                <button
                                    onClick={() => window.open('https://www.daraz.com.bd/', '_blank')}
                                    className={`w-full ${comparison.buttonColor} text-white text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition-colors duration-300`}
                                >
                                    <FiShoppingCart className="text-sm" />
                                    Shop on Daraz
                                </button>
                            )}

                            {savings?.isLocalCheaper && (
                                <div className="text-center text-xs text-gray-500 mt-2">
                                    💡 Tip: Visit the market to get the best deal!
                                </div>
                            )}
                        </div>

                        {/* Refresh/Close Button */}
                        <button
                            onClick={() => setShowComparison(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Close"
                        >
                            <FiRefreshCw className="text-sm" />
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-3 pt-2 border-t border-gray-200">
                        *Prices are estimated for comparison purposes. Actual prices may vary.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PriceComparison;
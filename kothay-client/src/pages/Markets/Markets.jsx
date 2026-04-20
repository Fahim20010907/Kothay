// src/pages/Markets/Markets.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FiMapPin, FiStar, FiSearch, FiFilter,
    FiShoppingBag, FiSmartphone, FiHome, FiCoffee, FiGrid, FiUsers
} from 'react-icons/fi';
import { getMarkets } from '../../services/api';
import OpeningStatusBadge from '../../utils/openingStatus.jsx';
import useWatchlist from '../../hooks/useWatchlist';
import WatchlistButton from '../Watchlist/WatchlistButton';
const Markets = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const categories = [
        { id: 'all', name: 'All Markets', icon: FiGrid, color: 'bg-gray-500' },
        { id: 'electronics', name: 'Electronics', icon: FiSmartphone, color: 'bg-blue-500' },
        { id: 'clothing', name: 'Clothing', icon: FiShoppingBag, color: 'bg-purple-500' },
        { id: 'street-food', name: 'Street Food', icon: FiCoffee, color: 'bg-orange-500' },
        { id: 'grocery', name: 'Grocery', icon: FiHome, color: 'bg-green-500' },
    ];

    useEffect(() => {
        fetchMarkets();
    }, [selectedCategory]);

    const fetchMarkets = async () => {
        setLoading(true);
        try {
            const data = await getMarkets(selectedCategory);
            setMarkets(data);
        } catch (error) {
            console.error('Error fetching markets:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter markets based on search
    const filteredMarkets = markets.filter(market => {
        const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            market.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (market.popularProducts && market.popularProducts.some(product => product.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesSearch;
    });

    const getPriceColor = (price) => {
        switch (price) {
            case 'Affordable': return 'text-green-600 bg-green-50';
            case 'Budget': return 'text-green-600 bg-green-50';
            case 'Mid-range': return 'text-blue-600 bg-blue-50';
            case 'Premium': return 'text-purple-600 bg-purple-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">📍</div>
                    <p className="text-gray-600 text-lg">Loading markets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Markets in Dhaka
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover the best markets for electronics, clothing, street food, and more
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by market name, location, or product..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white text-gray-900 rounded-full py-3 pl-12 pr-4 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        />
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="mb-10 overflow-x-auto">
                    <div className="flex gap-3 justify-center min-w-max">
                        {categories.map(category => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-amber-500 text-gray-900 shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <Icon className="text-lg" />
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">
                        Found <span className="font-semibold text-amber-600">{filteredMarkets.length}</span> markets
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiFilter />
                        <span>Filtered by: {categories.find(c => c.id === selectedCategory)?.name}</span>
                    </div>
                </div>

                {/* Markets Grid */}
                {filteredMarkets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMarkets.map(market => (
                            <div key={market._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    {market.image ? (
                                        <img
                                            src={market.image}
                                            alt={market.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                                            <span className="text-white text-6xl">🏪</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-amber-500 text-gray-900 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                                        <FiStar className="fill-current" /> {market.rating}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col gap-1.5">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{market.name}</h3>
                                    <div>
                                        <WatchlistButton
                                        vendor={{
                                            id: market._id,
                                            name: market.name,
                                            location: market.location
                                        }}
                                        vendorType="market"
                                        isInWatchlist={isInWatchlist(market._id)}
                                        onToggle={toggleWatchlist}
                                    />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                        <FiMapPin className="text-xs" />
                                        <span>{market.location}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${getPriceColor(market.priceLevel)}`}>
                                            {market.priceLevel}
                                        </span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                            <FiUsers className="text-xs" /> {market.vendors} vendors
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {market.description}
                                    </p>

                                    <div className="mb-3">
                                        <div className="flex flex-wrap gap-2">
                                            {market.popularProducts?.slice(0, 3).map((product, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {product}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                                        <div className="text-xs text-gray-500">
                                            🕒 {market.openingHours}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            ⭐ {market.reviews} reviews
                                        </div>
                                    </div>

                                    {/* Opening Status Badge */}
                                    <div className="mb-3">
                                        <OpeningStatusBadge openingHours={market.openingHours} showMessage={true} />
                                    </div>

                                    <Link
                                        to={`/markets/${market._id}`}
                                        className="mt-auto block text-center bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                    {/* <WatchlistButton
                                        vendor={{
                                            id: market._id,
                                            name: market.name,
                                            location: market.location
                                        }}
                                        vendorType="market"
                                        isInWatchlist={isInWatchlist(market._id)}
                                        onToggle={toggleWatchlist}
                                    /> */}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏪</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No markets found</h3>
                        <p className="text-gray-500">Try a different category or search term</p>
                    </div>
                )}

                {/* Category Highlights */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                        <FiSmartphone className="text-2xl mb-2" />
                        <h4 className="font-bold">Electronics</h4>
                        <p className="text-sm opacity-90">Laptops, mobiles, gadgets & more</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                        <FiShoppingBag className="text-2xl mb-2" />
                        <h4 className="font-bold">Clothing</h4>
                        <p className="text-sm opacity-90">Fashion, brands, accessories</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                        <FiCoffee className="text-2xl mb-2" />
                        <h4 className="font-bold">Street Food</h4>
                        <p className="text-sm opacity-90">Local delicacies & snacks</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                        <FiHome className="text-2xl mb-2" />
                        <h4 className="font-bold">Grocery</h4>
                        <p className="text-sm opacity-90">Fresh produce & daily essentials</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Markets;
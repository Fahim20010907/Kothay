// src/pages/Markets/MarketDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FiMapPin, FiStar, FiClock, FiUsers, FiShoppingBag,
    FiSmartphone, FiHome, FiCoffee, FiArrowLeft,
    FiThumbsUp, FiShare2, FiHeart, FiPhone, FiMail,
    FiCheckCircle, FiAlertCircle, FiTrendingUp, FiDollarSign
} from 'react-icons/fi';
import { getMarketById } from '../../services/api';
import OpeningStatusBadge from '../../utils/openingStatus';
import VendorCard from '../Vendor/VendorCard';
import RouteNavigation from './RouteNavigation';
import PriceComparison from './PriceComparison';

const MarketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [market, setMarket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMarketDetails();
    }, [id]);

    const fetchMarketDetails = async () => {
        setLoading(true);
        try {
            const data = await getMarketById(id);
            setMarket(data);
        } catch (error) {
            console.error('Error fetching market details:', error);
            setError('Failed to load market details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'electronics': return <FiSmartphone className="text-2xl" />;
            case 'clothing': return <FiShoppingBag className="text-2xl" />;
            case 'street-food': return <FiCoffee className="text-2xl" />;
            case 'grocery': return <FiHome className="text-2xl" />;
            default: return <FiMapPin className="text-2xl" />;
        }
    };

    const getPriceColor = (price) => {
        switch (price) {
            case 'Affordable': return 'text-green-600 bg-green-100';
            case 'Budget': return 'text-green-600 bg-green-100';
            case 'Mid-range': return 'text-blue-600 bg-blue-100';
            case 'Premium': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">🏪</div>
                    <p className="text-gray-600 text-lg">Loading market details...</p>
                </div>
            </div>
        );
    }

    if (error || !market) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4">😞</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Market Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || 'The market you\'re looking for doesn\'t exist.'}</p>
                    <button
                        onClick={() => navigate('/markets')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
                    >
                        Back to Markets
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                {market.image ? (
                    <img
                        src={market.image}
                        alt={market.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-teal-600 to-teal-800 flex items-center justify-center">
                        <span className="text-white text-8xl">🏪</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/markets')}
                    className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
                >
                    <FiArrowLeft /> Back to Markets
                </button>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300">
                        <FiHeart className="text-xl" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300">
                        <FiShare2 className="text-xl" />
                    </button>
                </div>

                {/* Market Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="container mx-auto">
                        {/* <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceColor(market.priceLevel)}`}>
                                {market.priceLevel}
                            </span>
                            <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <FiStar className="fill-current" /> {market.rating} ★
                            </span>
                            <span className="bg-teal-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                {market.reviews} reviews
                            </span>
                        </div> */}
                        <h1 className="text-3xl text-yellow-500 md:text-5xl font-bold mb-3">{market.name}</h1>
                        <p className="text-lg text-amber-400  flex items-center gap-2">
                            <FiMapPin /> {market.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>📖</span> About {market.name}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">{market.description}</p>
                        </div>

                        {/* Popular Products */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>🛍️</span> Popular Products
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {market.popularProducts?.map((product, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                                        {product}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Vendors Section */}
                        {market.vendorsList && market.vendorsList.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <span>🏪</span> Vendors in {market.name}
                                    </h2>
                                    <span className="text-sm text-gray-500">{market.vendorsList.length} vendors</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {market.vendorsList.map((vendor, idx) => (
                                        <VendorCard
                                            key={idx}
                                            vendor={vendor}
                                            marketId={market._id}
                                            marketName={market.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sub Categories */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>📂</span> Available Categories
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {market.subCategories?.map((category, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                                        <FiCheckCircle className="text-green-500 text-sm" />
                                        <span>{category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vendor Information */}
                        {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>👥</span> Vendor Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Total Vendors</span>
                                    <span className="text-xl font-bold text-teal-600">{market.vendors}+</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Average Rating</span>
                                    <span className="text-xl font-bold text-amber-500">{market.rating} ★</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>ℹ️</span> Quick Info
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiClock /> Opening Hours
                                    </span>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-medium text-gray-800">{market.openingHours}</span>
                                        <OpeningStatusBadge openingHours={market.openingHours} showMessage={false} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiDollarSign /> Price Level
                                    </span>
                                    <span className={`font-medium px-2 py-1 rounded ${getPriceColor(market.priceLevel)}`}>
                                        {market.priceLevel}
                                    </span>
                                </div>
                                {/* <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiUsers /> Total Reviews
                                    </span>
                                    <span className="font-medium text-gray-800">{market.reviews}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiUsers /> Total Vendors
                                    </span>
                                    <span className="font-medium text-gray-800">{market.vendors}+</span>
                                </div> */}
                            </div>
                        </div>

                        {/* Category Card */}
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                {getCategoryIcon(market.category)}
                                <h3 className="text-xl font-bold capitalize">{market.category}</h3>
                            </div>
                            <p className="text-teal-100 text-sm">
                                {market.category === 'electronics' && 'Find the best electronics, laptops, mobiles and gadgets'}
                                {market.category === 'clothing' && 'Discover fashionable clothing, accessories and brands'}
                                {market.category === 'street-food' && 'Explore delicious street food, snacks and local delicacies'}
                                {market.category === 'grocery' && 'Shop fresh vegetables, fruits and daily essentials'}
                            </p>
                        </div>

                        {/* Price Comparison Preview */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FiTrendingUp className="text-teal-600" /> Price Intelligence
                            </h3>
                            <PriceComparison
                                marketName={market.name}
                                productName="Popular Electronics"
                                localPrice={3500}
                                category={market.category}
                            />
                        </div>

                        {/* Best Time to Visit */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>⏰</span> Best Time to Visit
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Morning (10AM - 12PM)</span>
                                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">⭐ Best</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Afternoon (12PM - 4PM)</span>
                                    <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs">Moderate</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Evening (4PM - 8PM)</span>
                                    <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs">Busy</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                Based on community reports and crowd patterns
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <RouteNavigation
                                marketName={market.name}
                                marketLocation={market.location}
                                marketCoordinates={{ lat: 23.8103, lng: 90.4125 }} // You can update with actual coordinates
                            />

                        </div>
                    </div>
                </div>

                {/* Nearby Markets Section */}
                {/* <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Nearby Markets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <FiMapPin className="text-teal-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Nearby Market {item}</h4>
                                        <p className="text-xs text-gray-500">Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MarketDetails;
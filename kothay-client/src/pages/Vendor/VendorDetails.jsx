// src/pages/Vendor/VendorDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiStar, FiMapPin, FiCheckCircle, FiPhone,
    FiClock, FiShoppingBag, FiDollarSign, FiTag, FiInfo,
    FiAlertCircle, FiCalendar, FiArrowRight
} from 'react-icons/fi';
import { getMarketById } from '../../services/api';

const VendorDetails = () => {
    const { marketId, vendorId } = useParams();
    const navigate = useNavigate();
    const [market, setMarket] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVendorDetails();
    }, [marketId, vendorId]);

    const fetchVendorDetails = async () => {
        setLoading(true);
        try {
            const marketData = await getMarketById(marketId);
            setMarket(marketData);

            const foundVendor = marketData.vendorsList?.find(v =>
                v._id === vendorId ||
                `${marketId}_${v.name.replace(/\s/g, '-').toLowerCase()}` === vendorId
            );
            setVendor(foundVendor);
        } catch (error) {
            console.error('Error fetching vendor details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 4.0) return 'text-blue-600';
        return 'text-yellow-600';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">🏪</div>
                    <p className="text-gray-600 text-lg">Loading vendor details...</p>
                </div>
            </div>
        );
    }

    if (!vendor || !market) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4">😞</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Vendor Not Found</h2>
                    <p className="text-gray-600 mb-4">The vendor you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate(`/markets/${marketId}`)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
                    >
                        Back to Market
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="relative h-56 md:h-64 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="container mx-auto">
                        <button
                            onClick={() => navigate(`/markets/${marketId}`)}
                            className="mb-3 flex items-center gap-2 text-white/80 hover:text-white transition text-sm"
                        >
                            <FiArrowLeft /> Back to {market.name}
                        </button>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-3xl md:text-4xl font-bold">{vendor.name}</h1>
                            {vendor.isVerified && (
                                <span className="bg-green-500/20 backdrop-blur-sm text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                    <FiCheckCircle className="text-sm" /> Verified
                                </span>
                            )}
                        </div>
                        <p className="text-gray-200 mt-2 flex items-center gap-2">
                            <FiMapPin className="text-sm" /> Stall {vendor.stallNo} • {market.name}, {market.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Category & Rating Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            {vendor.category && (
                                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                                    <FiTag className="text-teal-500" />
                                    <span className="text-gray-700 font-medium">{vendor.category}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 bg-amber-50 rounded-full px-4 py-2 shadow-sm border border-amber-100">
                                <FiStar className="text-amber-500 fill-amber-500" />
                                <span className={`font-bold ${getRatingColor(vendor.rating)}`}>
                                    {vendor.rating} ★
                                </span>
                                <span className="text-gray-400 text-sm">(Based on customer reviews)</span>
                            </div>
                        </div>

                        {/* Description Section - Your Design */}
                        <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <FiInfo className="text-amber-400" /> About {vendor.name}
                            </h2>
                            <p className="text-gray-100 leading-relaxed">
                                {vendor.description || 'No description available for this vendor.'}
                            </p>
                        </div>

                        {/* Products Section - Your Design */}
                        {vendor.products && vendor.products.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiShoppingBag className="text-teal-600" /> Products & Prices
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 rounded-t-xl">
                                            <tr>
                                                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Product Name</th>
                                                <th className="text-right py-3 px-4 text-gray-600 font-semibold">Price (BDT)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {vendor.products.map((product, idx) => (
                                                <tr key={idx} className="hover:bg-teal-50 transition-colors">
                                                    <td className="py-3 px-4 text-gray-800 font-medium">{product.name}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <span className="text-teal-600 font-bold">{product.price}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* No Products Message */}
                        {(!vendor.products || vendor.products.length === 0) && (
                            <div className="bg-white rounded-2xl p-6 shadow-md text-center border border-gray-100">
                                <FiShoppingBag className="text-5xl text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No products listed for this vendor yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">

                        {/* Quick Info Card - Redesigned */}
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                    <FiAlertCircle className="text-teal-600 text-sm" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Quick Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FiMapPin className="text-teal-500 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Stall Number</p>
                                        <p className="text-gray-800 font-semibold">{vendor.stallNo || 'Not specified'}</p>
                                    </div>
                                </div>
                                {vendor.contact && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FiPhone className="text-teal-500 text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">Contact Number</p>
                                            <p className="text-gray-800 font-semibold">{vendor.contact}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FiDollarSign className="text-teal-500 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Price Range</p>
                                        <p className="text-gray-800 font-semibold">{vendor.priceRange || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours Card - Redesigned */}
                        {vendor.openingHours && (
                            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 shadow-md border border-teal-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-teal-200 rounded-full flex items-center justify-center">
                                        <FiClock className="text-teal-700 text-sm" />
                                    </div>
                                    <h3 className="text-lg font-bold text-teal-800">Business Hours</h3>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-teal-200">
                                    <span className="text-teal-700">Open Today</span>
                                    <span className="text-teal-900 font-semibold">{vendor.openingHours}</span>
                                </div>
                                <p className="text-xs text-teal-600 mt-3 flex items-center gap-1">
                                    <FiCalendar className="text-xs" /> Hours may vary on holidays
                                </p>
                            </div>
                        )}

                        {/* Market Location Card - Redesigned */}
                        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-6 shadow-md border border-amber-200">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                                    <FiMapPin className="text-amber-700 text-sm" />
                                </div>
                                <h3 className="text-lg font-bold text-amber-800">Located In</h3>
                            </div>
                            <div className="mb-3">
                                <p className="text-amber-900 font-bold text-lg">{market.name}</p>
                                <p className="text-amber-700 text-sm mt-1">{market.location}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/markets/${marketId}`)}
                                className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                View Full Market Details
                                <FiArrowRight className="text-sm" />
                            </button>
                        </div>

                        {/* Trust Badge - New Addition */}
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center">
                                    <div className="text-green-500 text-xl">✓</div>
                                    <p className="text-xs text-gray-500 mt-1">Genuine Products</p>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-green-500 text-xl">✓</div>
                                    <p className="text-xs text-gray-500 mt-1">Best Price Guarantee</p>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-green-500 text-xl">✓</div>
                                    <p className="text-xs text-gray-500 mt-1">Verified Vendor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDetails;
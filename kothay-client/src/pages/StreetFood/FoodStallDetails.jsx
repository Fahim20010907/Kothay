// src/pages/StreetFood/FoodStallDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FiMapPin, FiStar, FiClock, FiThumbsUp, FiArrowLeft,
    FiDollarSign, FiUsers, FiShare2, FiHeart, FiPhone,
    FiNavigation, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { getStreetFoodById } from '../../services/api';
import ReviewModal from './ReviewModal';
import StreetFoodRouteNavigation from './StreetFoodRouteNavigation';

const FoodStallDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stall, setStall] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);

    useEffect(() => {
        fetchStallDetails();
    }, [id]);

    const fetchStallDetails = async () => {
        setLoading(true);
        try {
            const data = await getStreetFoodById(id);
            setStall(data);
        } catch (error) {
            console.error('Error fetching stall details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCrowdColor = (crowd) => {
        switch (crowd) {
            case 'Very Busy': return 'text-red-600 bg-red-100';
            case 'Busy': return 'text-orange-600 bg-orange-100';
            case 'Moderate': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-green-600 bg-green-100';
        }
    };

    const getPriceIcon = (price) => {
        const count = price === '$' ? 1 : price === '$$' ? 2 : 3;
        return Array(count).fill().map((_, i) => <FiDollarSign key={i} className="inline text-sm" />);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">🍔</div>
                    <p className="text-gray-600 text-lg">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!stall) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4">😢</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Food Spot Not Found</h2>
                    <p className="text-gray-600 mb-4">The stall you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/street-food')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
                    >
                        Back to Street Food
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative h-80 overflow-hidden">
                {stall.image ? (
                    <img
                        src={stall.image}
                        alt={stall.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-8xl">
                            {stall.category === 'biriyani' && '🍚'}
                            {stall.category === 'fuchka' && '🍘'}
                            {stall.category === 'tea' && '☕'}
                            {stall.category === 'chaat' && '🥗'}
                            {(stall.category === 'burger' || stall.category === 'fast-food') && '🍔'}
                            {stall.category === 'sweets' && '🍰'}
                            {stall.category === 'grill' && '🍢'}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/street-food')}
                    className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
                >
                    <FiArrowLeft /> Back
                </button>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300">
                        <FiShare2 className="text-xl" />
                    </button>
                </div>
                {/* Get Directions */}
                <StreetFoodRouteNavigation
                    stallName={stall.name}
                    stallLocation={stall.location}
                    stallCoordinates={{ lat: stall.latitude || 23.8103, lng: stall.longitude || 90.4125 }}
                />

                {/* Stall Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-2 mb-3">
                            {stall.verified && (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <FiCheckCircle /> Verified
                                </span>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCrowdColor(stall.crowdLevel)}`}>
                                <FiUsers className="inline mr-1 text-xs" /> {stall.crowdLevel}
                            </span>
                            <span className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                <FiStar className="fill-current" /> {stall.rating} ★
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-3">{stall.name}</h1>
                        <p className="text-lg text-gray-200 flex items-center gap-2">
                            <FiMapPin /> {stall.location}, {stall.area}
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
                        <div className="bg-teal-900 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                                <span>📖</span> About This Spot
                            </h2>
                            <p className="text-white font-semibold leading-relaxed">{stall.description}</p>
                        </div>

                        {/* Popular Items */}
                        <div className="bg-teal-900 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                                <span>🍽️</span> Popular Items
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {stall.popularItems?.map((item, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-orange-50 text-orange-500 rounded-full text-sm font-bold">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Summary */}
                        <div className="bg-teal-900 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                                    <span>⭐</span> Customer Reviews
                                </h2>
                                <button
                                    onClick={() => navigate(`/street-food/${stall._id}/review`)}
                                    className="text-yellow-200 hover:text-amber-600 font-semibold"
                                >
                                    Write a Review →
                                </button>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl font-bold text-green-500">{stall.rating}</div>
                                <div className="text-white font-semibold">Based on {stall.reviews} reviews</div>
                            </div>
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="text-yellow-200 hover:text-teal-700 text-sm font-medium"
                            >
                                Read all reviews →
                            </button>
                        </div>
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
                                    <span className="font-medium text-gray-800">{stall.openingHours}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiDollarSign /> Price Range
                                    </span>
                                    <span className="font-medium text-gray-800 flex items-center gap-1">
                                        {getPriceIcon(stall.priceRange)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <FiUsers /> Total Reviews
                                    </span>
                                    <span className="font-medium text-gray-800">{stall.reviews}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">

                            <button
                                onClick={() => navigate(`/street-food/${stall._id}/review`)}
                                className="w-full bg-emerald-800 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FiStar /> Write a Review
                            </button>
                        </div>

                        {/* Category Badge */}
                        <div className="bg-gradient-to-r from-gray-900 to-teal-600 rounded-2xl p-6 text-white text-center">
                            <div className="text-5xl mb-2">
                                {stall.category === 'biriyani' && '🍚'}
                                {stall.category === 'fuchka' && '🍘'}
                                {stall.category === 'tea' && '☕'}
                                {stall.category === 'chaat' && '🥗'}
                                {(stall.category === 'burger' || stall.category === 'fast-food') && '🍔'}
                                {stall.category === 'sweets' && '🍰'}
                                {stall.category === 'grill' && '🍢'}
                            </div>
                            <h4 className="text-xl font-bold capitalize">{stall.category}</h4>
                            <p className="text-orange-100 text-sm mt-2">Popular choice among food lovers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                stallId={stall._id}
                stallName={stall.name}
            />
        </div>
    );
};

export default FoodStallDetails;
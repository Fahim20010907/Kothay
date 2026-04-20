// src/pages/StreetFood/StreetFood.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiMapPin, FiStar, FiClock, FiThumbsUp,
    FiSearch, FiFilter, FiDollarSign, FiUsers, FiSliders
} from 'react-icons/fi';
import { getStreetFood } from '../../services/api';
import ReviewModal from './ReviewModal';
import StreetFoodMap from './StreetFoodMap';
import useWatchlist from '../../hooks/useWatchlist';
import WatchlistButton from '../Watchlist/WatchlistButton';

const StreetFood = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [showRatingFilter, setShowRatingFilter] = useState(false);
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [userLocation, setUserLocation] = useState(null);
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    // State for review modal
    const [selectedStall, setSelectedStall] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const foodCategories = [
        { id: 'all', name: 'All', icon: '🍽️' },
        { id: 'biriyani', name: 'Biriyani', icon: '🍚' },
        { id: 'chaat', name: 'Chaat', icon: '🥗' },
        { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
        { id: 'fuchka', name: 'Fuchka', icon: '🍘' },
        { id: 'tea', name: 'Tea & Coffee', icon: '☕' },
        { id: 'sweets', name: 'Sweets', icon: '🍰' },
        { id: 'grill', name: 'Grill', icon: '🍢' },
    ];

    const ratingOptions = [
        { value: 0, label: 'All Ratings', icon: '⭐' },
        { value: 4, label: '4.0+ Stars', icon: '⭐' },
        { value: 4.3, label: '4.3+ Stars', icon: '⭐⭐' },
        { value: 4.5, label: '4.5+ Stars', icon: '⭐⭐⭐' },
        { value: 4.8, label: '4.8+ Stars', icon: '⭐⭐⭐⭐' },
    ];

    useEffect(() => {
        fetchStalls();
    }, [selectedCategory]);

    const fetchStalls = async () => {
        setLoading(true);
        try {
            const data = await getStreetFood(selectedCategory);
            setStalls(data);
        } catch (error) {
            console.error('Error fetching street food:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle view reviews click
    const handleViewReviews = (stall) => {
        setSelectedStall(stall);
        setShowReviewModal(true);
    };

    // Handle stall selection from map - Navigate to details page
    const handleStallSelect = (stall) => {
        navigate(`/street-food/${stall._id}`);
    };

    // Filter stalls based on search, rating, and category
    const filteredStalls = stalls.filter(stall => {
        // Category filter
        let matchesCategory = true;
        if (selectedCategory !== 'all') {
            if (selectedCategory === 'fast-food') {
                matchesCategory = stall.category === 'burger' || stall.category === 'fast-food';
            } else {
                matchesCategory = stall.category === selectedCategory;
            }
        }

        // Search filter
        const matchesSearch = stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stall.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (stall.popularItems && stall.popularItems.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())));

        // Rating filter
        const matchesRating = selectedRating === 0 || stall.rating >= selectedRating;

        return matchesCategory && matchesSearch && matchesRating;
    });

    const getCrowdColor = (crowd) => {
        switch (crowd) {
            case 'Very Busy': return 'text-red-500 bg-red-50';
            case 'Busy': return 'text-orange-500 bg-orange-50';
            case 'Moderate': return 'text-yellow-500 bg-yellow-50';
            default: return 'text-green-500 bg-green-50';
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
                    <p className="text-gray-600 text-lg">Loading street food spots...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen pt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className='text-green-700'>Street Food</span> Spots in <span className='text-amber-500'>Dhaka</span>
                    </h1>
                    <p className="text-gray-600 font-semibold max-w-2xl mx-auto">
                        Discover the best street food stalls, from fuchka to biriyani. Real reviews and ratings from food lovers.
                    </p>
                </div>

                {/* View Toggle Buttons */}
                <div className="flex justify-center gap-3 mb-6">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${viewMode === 'grid'
                            ? 'bg-amber-500 text-gray-900 shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        📱 Grid View
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${viewMode === 'map'
                            ? 'bg-amber-500 text-gray-900 shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        🗺️ Map View
                    </button>
                </div>

                {/* Search and Filter Bar - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search by name, location, or food item..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-gray-900 rounded-full py-3 pl-12 pr-4 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                            />
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        </div>

                        {/* Rating Filter Toggle */}
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setShowRatingFilter(!showRatingFilter)}
                                className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 transition-colors"
                            >
                                <FiSliders />
                                {showRatingFilter ? 'Hide Rating Filter' : 'Filter by Rating'}
                            </button>
                        </div>

                        {/* Rating Filter Options */}
                        {showRatingFilter && (
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 mb-4">
                                <div className="flex flex-wrap gap-3">
                                    {ratingOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSelectedRating(option.value)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${selectedRating === option.value
                                                ? 'bg-amber-500 text-gray-900 shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <span>{option.icon}</span>
                                            <span>{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                                {selectedRating > 0 && (
                                    <div className="mt-3 text-sm text-gray-500">
                                        Showing spots with {selectedRating}+ stars
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Category Filters - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <FiFilter className="text-gray-500" />
                            <span className="text-gray-700 font-medium">Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {foodCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${selectedCategory === category.id
                                        ? 'bg-amber-500 text-gray-900 shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results Count - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Found <span className="font-semibold text-amber-600">{filteredStalls.length}</span> food spots
                            {selectedRating > 0 && <span className="text-sm ml-2">(filtered by {selectedRating}+ stars)</span>}
                        </p>
                    </div>
                )}

                {/* Map View */}
                {viewMode === 'map' && (
                    <StreetFoodMap
                        stalls={filteredStalls}
                        onStallSelect={handleStallSelect}
                        userLocation={userLocation}
                        setUserLocation={setUserLocation}
                    />
                )}

                {/* Food Stalls Grid - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <>
                        {filteredStalls.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredStalls.map(stall => (
                                    <div key={stall._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            {stall.image ? (
                                                <img
                                                    src={stall.image}
                                                    alt={stall.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                                                    <span className="text-white text-6xl">
                                                        {stall.category === 'biriyani' && '🍚'}
                                                        {stall.category === 'fuchka' && '🍘'}
                                                        {stall.category === 'tea' && '☕'}
                                                        {stall.category === 'chaat' && '🥗'}
                                                        {(stall.category === 'burger' || stall.category === 'fast-food') && '🍔'}
                                                        {stall.category === 'sweets' && '🍰'}
                                                        {stall.category === 'grill' && '🍢'}
                                                        {!['biriyani', 'fuchka', 'tea', 'chaat', 'burger', 'fast-food', 'sweets', 'grill'].includes(stall.category) && '🍽️'}
                                                    </span>
                                                </div>
                                            )}
                                            {stall.verified && (
                                                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                                                    <FiThumbsUp className="text-xs" /> Verified
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-amber-500 text-gray-900 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                                                <FiStar className="fill-current" /> {stall.rating}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-lg font-semibold text-gray-800">{stall.name}</h3>
                                                <WatchlistButton
                                                    vendor={{
                                                        id: stall._id,
                                                        name: stall.name,
                                                        location: stall.location
                                                    }}
                                                    vendorType="street-food"
                                                    isInWatchlist={isInWatchlist(stall._id)}
                                                    onToggle={toggleWatchlist}
                                                />
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                <FiMapPin className="text-xs" />
                                                <span>{stall.location}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-gray-400 text-xs">{stall.area}</span>
                                            </div>

                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    {getPriceIcon(stall.priceRange)}
                                                </div>
                                                <div className={`text-xs px-2 py-1 rounded-full ${getCrowdColor(stall.crowdLevel)}`}>
                                                    <FiUsers className="inline mr-1 text-xs" />
                                                    {stall.crowdLevel}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {stall.description}
                                            </p>

                                            <div className="mb-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {stall.popularItems?.slice(0, 3).map((item, idx) => (
                                                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <FiClock className="text-xs" />
                                                    <span>{stall.openingHours}</span>
                                                </div>
                                                {/* Clickable Review Count */}
                                                <div
                                                    className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-amber-600 transition-colors"
                                                    onClick={() => handleViewReviews(stall)}
                                                >
                                                    <FiStar className="text-xs" />
                                                    <span>{stall.reviews} review{stall.reviews !== 1 ? 's' : ''}</span>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <Link to={`/street-food/${stall._id}`} className="mt-2">
                                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                                                    View Details
                                                </button>
                                            </Link>

                                            {/* Write Review Button */}
                                            <Link to={`/street-food/${stall._id}/review`} className="mt-2">
                                                <button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                                                    <FiStar /> Write a Review
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🍽️</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No food spots found</h3>
                                <p className="text-gray-500">
                                    {selectedRating > 0
                                        ? `No spots with ${selectedRating}+ stars found. Try a lower rating filter.`
                                        : 'Try a different category or search term'}
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Featured Food Areas - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <div className="mt-16 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Food Destinations in Dhaka</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Old Dhaka', spots: '50+ spots', desc: 'Authentic traditional food' },
                                { name: 'Dhanmondi', spots: '35+ spots', desc: 'Cafes & modern eateries' },
                                { name: 'Gulshan', spots: '40+ spots', desc: 'Fine dining & street food' },
                                { name: 'Mirpur', spots: '30+ spots', desc: 'Local favorites' }
                            ].map((area, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
                                    <h4 className="font-semibold text-gray-800">{area.name}</h4>
                                    <p className="text-sm text-amber-600">{area.spots}</p>
                                    <p className="text-xs text-gray-500 mt-1">{area.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA - Only show in Grid View */}
                {viewMode === 'grid' && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">Know a great food spot? Share with the community!</p>
                        <Link to="/street-food/add">
                            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition">
                                Add a Food Spot
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                stallId={selectedStall?._id}
                stallName={selectedStall?.name}
            />
        </div>
    );
};

export default StreetFood;
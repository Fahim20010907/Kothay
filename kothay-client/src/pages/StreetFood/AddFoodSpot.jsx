// src/pages/StreetFood/AddFoodSpot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFoodSpot = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        category: 'biriyani',
        location: '',
        area: '',
        latitude: null,
        longitude: null,
        description: '',
        priceRange: '$$',
        openingHours: '',
        crowdLevel: 'Moderate',
        popularItems: '',
        image: '',
        rating: 5
    });

    const categories = [
        { id: 'biriyani', name: 'Biriyani', icon: '🍚' },
        { id: 'chaat', name: 'Chaat', icon: '🥗' },
        { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
        { id: 'fuchka', name: 'Fuchka', icon: '🍘' },
        { id: 'tea', name: 'Tea & Coffee', icon: '☕' },
        { id: 'sweets', name: 'Sweets', icon: '🍰' },
        { id: 'grill', name: 'Grill', icon: '🍢' },
    ];

    const priceRanges = [
        { value: '$', label: 'Budget (under 100 BDT)', icon: '💰' },
        { value: '$$', label: 'Moderate (100-300 BDT)', icon: '💰💰' },
        { value: '$$$', label: 'Premium (300+ BDT)', icon: '💰💰💰' },
    ];

    const crowdLevels = [
        { value: 'Moderate', label: 'Moderate', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'Busy', label: 'Busy', color: 'bg-orange-100 text-orange-700' },
        { value: 'Very Busy', label: 'Very Busy', color: 'bg-red-100 text-red-700' },
    ];

    // Dhaka areas for map location
    const dhakaAreas = [
        { name: 'Shahbagh / New Market', lat: 23.7381, lng: 90.3945 },
        { name: 'Dhanmondi', lat: 23.7459, lng: 90.3762 },
        { name: 'Gulshan', lat: 23.7904, lng: 90.4160 },
        { name: 'Banani', lat: 23.7945, lng: 90.4040 },
        { name: 'Old Dhaka / Chawkbazar', lat: 23.7100, lng: 90.4040 },
        { name: 'Mirpur', lat: 23.8063, lng: 90.3700 },
        { name: 'Motijheel', lat: 23.7339, lng: 90.4179 },
        { name: 'Uttara', lat: 23.8759, lng: 90.3795 },
        { name: 'Elephant Road', lat: 23.7415, lng: 90.3925 },
        { name: 'Panthapath', lat: 23.7485, lng: 90.3885 },
        { name: 'Kawran Bazar', lat: 23.7555, lng: 90.3855 },
        { name: 'Bashabo', lat: 23.7585, lng: 90.4255 },
        { name: 'Khilgaon', lat: 23.7455, lng: 90.4305 },
        { name: 'Mohakhali', lat: 23.7775, lng: 90.4065 },
        { name: 'Tejgaon', lat: 23.7595, lng: 90.4015 },
        { name: 'Farmgate', lat: 23.7645, lng: 90.3905 },
        { name: 'Malibagh', lat: 23.7485, lng: 90.4125 },
        { name: 'Shantinagar', lat: 23.7355, lng: 90.4155 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Convert popularItems string to array
            const popularItemsArray = formData.popularItems
                .split(',')
                .map(item => item.trim())
                .filter(item => item);

            const newStall = {
                ...formData,
                popularItems: popularItemsArray,
                rating: formData.rating,
                reviews: 1,
                verified: false,
                createdAt: new Date().toISOString()
            };

            const response = await axios.post('http://localhost:3000/api/street-food', newStall);

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Food Spot Added!',
                    text: 'Your food spot has been submitted for admin approval.',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#1a2a3a',
                    color: '#fff'
                });
                setTimeout(() => {
                    navigate('/street-food');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add food spot. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || 'Failed to add food spot',
                confirmButtonColor: '#f59e0b',
                background: '#1a2a3a',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="text-4xl text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Successfully Added!</h2>
                    <p className="text-gray-600 mb-4">Your food spot has been submitted for review.</p>
                    <p className="text-sm text-gray-500">Redirecting you back...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/street-food')}
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors mb-4"
                    >
                        <FiArrowLeft /> Back to Street Food
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Add a Food Spot
                    </h1>
                    <p className="text-gray-600">
                        Share your favorite street food spot with the Kothay community
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Food Spot Details</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Stall Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Star Kebab & Biriyani"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category *
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${formData.category === cat.id
                                            ? 'bg-teal-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location / Area *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., New Market Area"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    District / Zone *
                                </label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Shahbagh"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>

                        {/* Area Selection for Map */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Area for Map *
                            </label>
                            <select
                                value={selectedArea}
                                onChange={(e) => {
                                    const area = dhakaAreas.find(a => a.name === e.target.value);
                                    setSelectedArea(e.target.value);
                                    setFormData(prev => ({
                                        ...prev,
                                        area: e.target.value,
                                        latitude: area?.lat || 23.8103,
                                        longitude: area?.lng || 90.4125
                                    }));
                                }}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Select an area in Dhaka</option>
                                {dhakaAreas.map(area => (
                                    <option key={area.name} value={area.name}>{area.name}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Select the area where this food spot is located for accurate map positioning</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="3"
                                placeholder="Describe what makes this food spot special..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            ></textarea>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Rating *
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                        className={`text-3xl transition-all duration-300 ${formData.rating >= star
                                            ? 'text-amber-400'
                                            : 'text-gray-300 hover:text-amber-200'
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Select your rating for this food spot</p>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price Range *
                            </label>
                            <div className="flex gap-3">
                                {priceRanges.map(price => (
                                    <button
                                        key={price.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, priceRange: price.value }))}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${formData.priceRange === price.value
                                            ? 'bg-teal-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span className="mr-2">{price.icon}</span>
                                        {price.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Opening Hours *
                            </label>
                            <input
                                type="text"
                                name="openingHours"
                                value={formData.openingHours}
                                onChange={handleChange}
                                required
                                placeholder="e.g., 11:00 AM - 10:00 PM"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* Crowd Level */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Typical Crowd Level *
                            </label>
                            <div className="flex gap-3">
                                {crowdLevels.map(level => (
                                    <button
                                        key={level.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, crowdLevel: level.value }))}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${formData.crowdLevel === level.value
                                            ? `${level.color} ring-2 ring-teal-500`
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {level.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Popular Items */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Popular Items (comma separated) *
                            </label>
                            <input
                                type="text"
                                name="popularItems"
                                value={formData.popularItems}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Chicken Biriyani, Beef Tehari, Borhani"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate items with commas</p>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image URL (optional)
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/food-image.jpg"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Add a link to an image of this food spot</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                <FiAlertCircle className="text-red-500" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/street-food')}
                                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <FiUpload />
                                        Add Food Spot
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Note */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        All submissions are reviewed by our community before being published.
                        Help us keep Kothay accurate and trustworthy!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddFoodSpot;
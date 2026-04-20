import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiCheck, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const AddReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        userName: '',
        rating: 5,
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`http://localhost:3000/api/reviews/street-food/${id}`, formData);

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/street-food');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Submitted!</h2>
                    <p className="text-gray-600 mb-4">Thank you for sharing your experience.</p>
                    <p className="text-sm text-gray-500">Redirecting you back...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">

                <div className="mb-8">
                    <button
                        onClick={() => navigate('/street-food')}
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors mb-4"
                    >
                        <FiArrowLeft /> Back to Street Food
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Write a Review
                    </h1>
                    <p className="text-gray-600">
                        Share your experience at this food spot
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-900">Rate This Food Spot</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* User Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="e.g., Rakib Hasan"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Optional - leave blank to stay anonymous</p>
                        </div>

                        {/* Rating Stars */}
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
                                        className={`text-4xl transition-all duration-300 ${formData.rating >= star
                                                ? 'text-amber-400'
                                                : 'text-gray-300 hover:text-amber-200'
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Review Comment */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Review *
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Share your experience... What did you try? How was the taste? Would you recommend?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            ></textarea>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                <FiAlertCircle className="text-red-500" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-4">
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
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FiStar />
                                        Submit Review
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
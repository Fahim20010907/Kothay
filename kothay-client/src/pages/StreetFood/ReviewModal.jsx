import React, { useState, useEffect } from 'react';
import { FiX, FiStar, FiUser, FiClock } from 'react-icons/fi';
import { getReviewsByStallId } from '../../services/api';


const ReviewModal = ({ isOpen, onClose, stallId, stallName }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        if (isOpen && stallId) {
            fetchReviews();
        }
    }, [isOpen, stallId]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await getReviewsByStallId(stallId);
            setReviews(data.data || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSortedReviews = () => {
        const sorted = [...reviews];
        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'highest':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'lowest':
                return sorted.sort((a, b) => a.rating - b.rating);
            default:
                return sorted;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">

                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-white">Reviews for {stallName}</h2>
                            <p className="text-teal-100 text-sm mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-amber-300 transition-colors p-1"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>

                    {/* Sort Options */}
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <div className="flex gap-2">
                            {[
                                { value: 'newest', label: 'Newest' },
                                { value: 'oldest', label: 'Oldest' },
                                { value: 'highest', label: 'Highest Rating' },
                                { value: 'lowest', label: 'Lowest Rating' }
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${sortBy === option.value
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-3 animate-pulse">⭐</div>
                                <p className="text-gray-500">Loading reviews...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-3">📝</div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
                                <p className="text-gray-500">Be the first to review this food spot!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {getSortedReviews().map((review, index) => (
                                    <div key={review._id || index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {review.userAvatar ? (
                                                    <img
                                                        src={review.userAvatar}
                                                        alt={review.userName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                                                        <FiUser className="text-white text-lg" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <FiStar
                                                                    key={star}
                                                                    className={`text-sm ${star <= review.rating
                                                                        ? 'text-amber-400 fill-amber-400'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FiClock className="text-xs" />
                                                            {formatDate(review.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3">
                        <p className="text-xs text-gray-500 text-center">
                            Reviews are from real users. Help the community by sharing your experience!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
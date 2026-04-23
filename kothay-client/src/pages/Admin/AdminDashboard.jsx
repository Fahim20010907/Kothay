// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    FiUsers, FiStar, FiMapPin, FiCoffee, FiTrash2,
    FiCheckCircle, FiEdit2, FiEye, FiEyeOff, FiXCircle
} from 'react-icons/fi';
import Swal from 'sweetalert2';

// Add your backend URL here
const API_BASE_URL = 'https://kothay-server001.vercel.app/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('foodSpots');
    const [foodSpots, setFoodSpots] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('kothay_token');
            const headers = { Authorization: `Bearer ${token}` };

            if (activeTab === 'foodSpots') {
                const res = await axios.get(`${API_BASE_URL}/admin/street-food`, { headers });
                setFoodSpots(res.data.data);
            } else if (activeTab === 'markets') {
                const res = await axios.get(`${API_BASE_URL}/admin/markets`, { headers });
                setMarkets(res.data.data);
            } else if (activeTab === 'reviews') {
                const res = await axios.get(`${API_BASE_URL}/admin/reviews`, { headers });
                setReviews(res.data.data);
            } else if (activeTab === 'users') {
                const res = await axios.get(`${API_BASE_URL}/admin/users`, { headers });
                setUsers(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire('Error!', 'Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    // ============ FOOD SPOT ACTIONS ============
    const handleVerifyFoodSpot = async (id, verified) => {
        try {
            const token = localStorage.getItem('kothay_token');
            await axios.patch(`${API_BASE_URL}/admin/street-food/${id}/verify`,
                { verified },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Swal.fire('Success!', `Food spot ${verified ? 'verified' : 'unverified'} successfully.`, 'success');
            fetchData();
        } catch (error) {
            Swal.fire('Error!', 'Failed to update verification status.', 'error');
        }
    };

    const handleDeleteFoodSpot = async (id, name) => {
        const result = await Swal.fire({
            title: 'Delete Food Spot?',
            text: `Are you sure you want to delete "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('kothay_token');
                await axios.delete(`${API_BASE_URL}/admin/street-food/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Deleted!', 'Food spot has been deleted.', 'success');
                fetchData();
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete food spot.', 'error');
            }
        }
    };

    // ============ MARKET ACTIONS ============
    const handleDeleteMarket = async (id, name) => {
        const result = await Swal.fire({
            title: 'Delete Market?',
            text: `Are you sure you want to delete "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('kothay_token');
                await axios.delete(`${API_BASE_URL}/admin/markets/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Deleted!', 'Market has been deleted.', 'success');
                fetchData();
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete market.', 'error');
            }
        }
    };

    // ============ REVIEW ACTIONS ============
    const handleDeleteReview = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Review?',
            text: 'Are you sure you want to delete this review?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('kothay_token');
                await axios.delete(`${API_BASE_URL}/admin/reviews/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Deleted!', 'Review has been deleted.', 'success');
                fetchData();
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete review.', 'error');
            }
        }
    };

    // ============ USER ACTIONS ============
    const handleBlockUser = async (userId, userName, isBlocked) => {
        const action = isBlocked ? 'unblock' : 'block';
        const result = await Swal.fire({
            title: `${action === 'block' ? 'Block' : 'Unblock'} User?`,
            text: `Are you sure you want to ${action} "${userName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: action === 'block' ? '#d33' : '#22c55e',
            confirmButtonText: `Yes, ${action} user!`
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('kothay_token');
                await axios.patch(`${API_BASE_URL}/admin/users/${userId}/block`,
                    { isBlocked: !isBlocked },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                Swal.fire('Success!', `User has been ${action}ed.`, 'success');
                fetchData();
            } catch (error) {
                Swal.fire('Error!', `Failed to ${action} user.`, 'error');
            }
        }
    };

    const tabs = [
        { id: 'foodSpots', label: 'Food Spots', icon: FiCoffee, count: foodSpots.length },
        { id: 'markets', label: 'Markets', icon: FiMapPin, count: markets.length },
        { id: 'reviews', label: 'Reviews', icon: FiStar, count: reviews.length },
        { id: 'users', label: 'Users', icon: FiUsers, count: users.length },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage markets, food spots, reviews, and users</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-teal-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                <Icon className="text-lg" />
                                <span>{tab.label}</span>
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Food Spots Tab */}
                        {activeTab === 'foodSpots' && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {foodSpots.map(spot => (
                                                <tr key={spot._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{spot.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{spot.location}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">⭐ {spot.rating}</td>
                                                    <td className="px-6 py-4">
                                                        {spot.verified ? (
                                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Verified</span>
                                                        ) : (
                                                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-3">
                                                            {!spot.verified && (
                                                                <button
                                                                    onClick={() => handleVerifyFoodSpot(spot._id, true)}
                                                                    className="text-green-600 hover:text-green-800"
                                                                    title="Verify"
                                                                >
                                                                    <FiCheckCircle />
                                                                </button>
                                                            )}
                                                            {spot.verified && (
                                                                <button
                                                                    onClick={() => handleVerifyFoodSpot(spot._id, false)}
                                                                    className="text-yellow-600 hover:text-yellow-800"
                                                                    title="Unverify"
                                                                >
                                                                    <FiXCircle />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteFoodSpot(spot._id, spot.name)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {foodSpots.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">No food spots found</div>
                                )}
                            </div>
                        )}

                        {/* Markets Tab */}
                        {activeTab === 'markets' && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendors</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {markets.map(market => (
                                                <tr key={market._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{market.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{market.location}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{market.category}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{market.vendors}</td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleDeleteMarket(market._id, market.name)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {markets.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">No markets found</div>
                                )}
                            </div>
                        )}

                        {/* Reviews Tab - With Food Spot Column */}
                        {activeTab === 'reviews' && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Food Spot</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reviews.map(review => (
                                                <tr key={review._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{review.userName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {review.foodSpotName ? (
                                                            <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium whitespace-nowrap">
                                                                🍽️ {review.foodSpotName}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 text-xs">Unknown</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{review.comment}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">⭐ {review.rating}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleDeleteReview(review._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {reviews.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">No reviews found</div>
                                )}
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.map(user => (
                                                <tr key={user._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.fullName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${user.email === 'almahfuz0179@gmail.com' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                                            {user.email === 'almahfuz0179@gmail.com' ? 'Admin' : 'User'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.email !== 'almahfuz0179@gmail.com' && (
                                                            <button
                                                                onClick={() => handleBlockUser(user._id, user.fullName, user.isBlocked)}
                                                                className={`${user.isBlocked ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
                                                                title={user.isBlocked ? 'Unblock' : 'Block'}
                                                            >
                                                                {user.isBlocked ? <FiEye /> : <FiEyeOff />}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {users.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">No users found</div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
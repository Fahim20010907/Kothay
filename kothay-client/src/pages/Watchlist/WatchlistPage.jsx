// src/pages/Watchlist/WatchlistPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete, MdNotificationsActive, MdStore, MdRestaurant } from 'react-icons/md';
import Swal from 'sweetalert2';
import WatchlistNote from './WatchlistNote';
import ReminderModal from './ReminderModal';

// Add your backend URL here
const API_BASE_URL = 'https://kothay-server001.vercel.app/api';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showReminderModal, setShowReminderModal] = useState(false);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('kothay_token');
            const response = await fetch(`${API_BASE_URL}/users/watchlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setWatchlist(data.data);
            }
        } catch (error) {
            console.error('Error fetching watchlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async (vendorId) => {
        const result = await Swal.fire({
            title: 'Remove from Watchlist?',
            text: 'Are you sure you want to remove this vendor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('kothay_token');
                await fetch(`${API_BASE_URL}/users/watchlist/${vendorId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Removed!', 'Vendor removed from watchlist.', 'success');
                fetchWatchlist();
            } catch (error) {
                Swal.fire('Error!', 'Failed to remove vendor.', 'error');
            }
        }
    };

    const handleUpdateNote = async (vendorId, note) => {
        try {
            const token = localStorage.getItem('kothay_token');
            await fetch(`${API_BASE_URL}/users/watchlist/${vendorId}/note`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ note })
            });
            fetchWatchlist();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleSetReminder = async (vendorId, reminderDate) => {
        try {
            const token = localStorage.getItem('kothay_token');
            await fetch(`${API_BASE_URL}/users/watchlist/${vendorId}/reminder`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reminderDate })
            });
            Swal.fire('Success!', 'Reminder set successfully!', 'success');
            fetchWatchlist();
        } catch (error) {
            Swal.fire('Error!', 'Failed to set reminder.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">❤️</div>
                    <p className="text-gray-600 text-lg">Loading your watchlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-red-500">❤️</span> My Watchlist
                    </h1>
                    <p className="text-gray-600 mt-2">Your saved vendors and markets</p>
                </div>

                {/* Watchlist Grid */}
                {watchlist.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your watchlist is empty</h3>
                        <p className="text-gray-500 mb-4">Start saving vendors you love!</p>
                        <Link to="/markets" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition">
                            Browse Markets
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {watchlist.map((item) => (
                            <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                {/* Card Header */}
                                <div className={`p-4 ${item.vendorType === 'market' ? 'bg-gradient-to-r from-teal-600 to-teal-700' : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {item.vendorType === 'market' ? (
                                                <MdStore size={24} />
                                            ) : (
                                                <MdRestaurant size={24} />
                                            )}
                                            <h3 className="font-bold text-lg">{item.vendorName}</h3>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFromWatchlist(item._id)}
                                            className="text-white/80 hover:text-red-200 transition"
                                            title="Remove from watchlist"
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-white/80 mt-1">{item.vendorLocation}</p>
                                </div>

                                {/* Card Body */}
                                <div className="p-4">
                                    <WatchlistNote
                                        vendorId={item._id}
                                        initialNote={item.note}
                                        onUpdateNote={handleUpdateNote}
                                    />

                                    {/* Reminder Section */}
                                    {item.reminderDate ? (
                                        <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-amber-700">
                                                    <MdNotificationsActive size={16} />
                                                    <span className="text-xs font-medium">Reminder set</span>
                                                </div>
                                                <span className="text-xs text-amber-600">
                                                    {new Date(item.reminderDate).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setSelectedVendor(item);
                                                setShowReminderModal(true);
                                            }}
                                            className="mt-3 text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                                        >
                                            <MdNotificationsActive size={14} /> Set Reminder
                                        </button>
                                    )}

                                    {/* View Details Link */}
                                    <Link
                                        to={`/${item.vendorType === 'market' ? 'markets' : 'street-food'}/${item.vendorId}`}
                                        className="mt-3 block text-center bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-600 text-sm font-semibold py-2 rounded-lg transition-colors duration-300"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reminder Modal */}
            <ReminderModal
                isOpen={showReminderModal}
                onClose={() => {
                    setShowReminderModal(false);
                    setSelectedVendor(null);
                }}
                onSetReminder={handleSetReminder}
                vendor={selectedVendor}
            />
        </div>
    );
};

export default WatchlistPage;
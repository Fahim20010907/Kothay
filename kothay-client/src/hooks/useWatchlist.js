// src/hooks/useWatchlist.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Add your backend URL here
const API_BASE_URL = 'https://kothay-server001.vercel.app/api';

const useWatchlist = () => {
    const [watchlistIds, setWatchlistIds] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user's watchlist
    const fetchWatchlist = async () => {
        try {
            const token = localStorage.getItem('kothay_token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/users/watchlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                const ids = response.data.data.map(item => item.vendorId);
                setWatchlistIds(ids);
            }
        } catch (error) {
            console.error('Error fetching watchlist:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add to watchlist
    const addToWatchlist = async (vendor, vendorType, note) => {
        try {
            const token = localStorage.getItem('kothay_token');
            const response = await axios.post(`${API_BASE_URL}/users/watchlist`,
                {
                    vendorId: vendor.id,
                    vendorType: vendorType,
                    vendorName: vendor.name,
                    vendorLocation: vendor.location,
                    note: note
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setWatchlistIds(prev => [...prev, vendor.id]);
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: `${vendor.name} added to your watchlist`,
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1a2a3a',
                    color: '#fff'
                });
                return true;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Could not add to watchlist',
                confirmButtonColor: '#f59e0b',
                background: '#1a2a3a',
                color: '#fff'
            });
            return false;
        }
    };

    // Remove from watchlist
    const removeFromWatchlist = async (vendorId, vendorName) => {
        try {
            // Find the watchlist item id
            const token = localStorage.getItem('kothay_token');
            const response = await axios.get(`${API_BASE_URL}/users/watchlist`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const item = response.data.data.find(item => item.vendorId === vendorId);
            if (item) {
                await axios.delete(`${API_BASE_URL}/users/watchlist/${item._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setWatchlistIds(prev => prev.filter(id => id !== vendorId));
                Swal.fire({
                    icon: 'success',
                    title: 'Removed!',
                    text: `${vendorName} removed from watchlist`,
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1a2a3a',
                    color: '#fff'
                });
                return true;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Could not remove from watchlist',
                confirmButtonColor: '#f59e0b',
                background: '#1a2a3a',
                color: '#fff'
            });
            return false;
        }
    };

    // Toggle watchlist
    const toggleWatchlist = async (vendor, vendorType, note = '') => {
        const isInWatchlist = watchlistIds.includes(vendor.id);

        if (isInWatchlist) {
            await removeFromWatchlist(vendor.id, vendor.name);
        } else {
            await addToWatchlist(vendor, vendorType, note);
        }

        // Refetch to sync
        await fetchWatchlist();
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    return {
        watchlistIds,
        loading,
        toggleWatchlist,
        isInWatchlist: (vendorId) => watchlistIds.includes(vendorId),
        addToWatchlist,
        removeFromWatchlist,
        fetchWatchlist
    };
};

export default useWatchlist;
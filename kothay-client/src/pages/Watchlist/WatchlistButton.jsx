// src/pages/Watchlist/WatchlistButton.jsx
import React, { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import WatchlistModal from './WatchlistModal';

const WatchlistButton = ({ vendor, vendorType, isInWatchlist, onToggle }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (isInWatchlist) {
            // If already in watchlist, directly remove
            onToggle(vendor, vendorType);
        } else {
            // Show modal to add note
            setShowModal(true);
        }
    };

    const handleSave = (note) => {
        onToggle(vendor, vendorType, note);
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    isInWatchlist
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600'
                }`}
            >
                {isInWatchlist ? (
                    <>
                        <MdFavorite size={16} />
                        <span>Saved</span>
                    </>
                ) : (
                    <>
                        <MdFavoriteBorder size={16} />
                        <span>Save</span>
                    </>
                )}
            </button>

            <WatchlistModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                vendor={vendor}
            />
        </>
    );
};

export default WatchlistButton;
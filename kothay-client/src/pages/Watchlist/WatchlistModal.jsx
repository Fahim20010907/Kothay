// src/pages/Watchlist/WatchlistModal.jsx
import React, { useState } from 'react';
import { MdClose, MdNoteAdd } from 'react-icons/md';

const WatchlistModal = ({ isOpen, onClose, onSave, vendor }) => {
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(note);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MdNoteAdd className="text-teal-600" size={24} />
                        Save to Watchlist
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <MdClose size={24} />
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-600 mb-3">
                        Save <span className="font-semibold text-teal-600">{vendor?.name}</span> to your personal watchlist
                    </p>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add a note <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g., 'best for electronics' or 'visit on Friday'"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                        rows="3"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            Save to Watchlist
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistModal;
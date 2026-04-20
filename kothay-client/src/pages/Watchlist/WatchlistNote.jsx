// src/pages/Watchlist/WatchlistNote.jsx
import React, { useState } from 'react';
import { MdEdit, MdSave, MdClose } from 'react-icons/md';

const WatchlistNote = ({ vendorId, initialNote, onUpdateNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState(initialNote || '');

    const handleSave = () => {
        onUpdateNote(vendorId, note);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="mt-2">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-teal-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    rows="2"
                    placeholder="Add your note..."
                />
                <div className="flex gap-2 mt-1">
                    <button onClick={handleSave} className="text-teal-600 hover:text-teal-700 text-sm flex items-center gap-1">
                        <MdSave size={14} /> Save
                    </button>
                    <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                        <MdClose size={14} /> Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-2">
            {note ? (
                <div className="bg-teal-50 p-2 rounded-lg border border-teal-100">
                    <p className="text-sm text-teal-800">📝 {note}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs text-teal-600 hover:text-teal-700 mt-1 flex items-center gap-1"
                    >
                        <MdEdit size={12} /> Edit note
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                    <MdEdit size={14} /> Add a note
                </button>
            )}
        </div>
    );
};

export default WatchlistNote;
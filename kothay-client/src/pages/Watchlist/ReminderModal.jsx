// src/pages/Watchlist/ReminderModal.jsx
import React, { useState } from 'react';
import { MdClose, MdNotificationsActive } from 'react-icons/md';

const ReminderModal = ({ isOpen, onClose, onSetReminder, vendor }) => {
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    if (!isOpen) return null;

    const handleSetReminder = () => {
        if (reminderDate && reminderTime) {
            const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
            onSetReminder(vendor.id, reminderDateTime.toISOString());
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MdNotificationsActive className="text-teal-600" size={24} />
                        Set Reminder
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <MdClose size={24} />
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-gray-600 mb-4">
                        Set a reminder for <span className="font-semibold text-teal-600">{vendor?.name}</span>
                    </p>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                    </label>
                    <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={handleSetReminder}
                            className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            Set Reminder
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

export default ReminderModal;
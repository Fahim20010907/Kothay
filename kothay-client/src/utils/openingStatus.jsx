// src/utils/openingStatus.js
import React from 'react';

// Parse time string like "10:00 AM" to minutes since midnight
const parseTime = (timeStr) => {
    if (!timeStr) return null;

    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
};

// Get current time in minutes since midnight
const getCurrentTimeInMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
};

// Format minutes to readable time (e.g., "8:00 PM")
const formatMinutesToTime = (minutes) => {
    if (minutes === null) return 'Unknown';

    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    if (hours === 0) hours = 12;

    return `${hours}:${mins.toString().padStart(2, '0')} ${period}`;
};

// Get opening status of a market
export const getMarketOpeningStatus = (openingHours) => {
    if (!openingHours) {
        return {
            isOpen: false,
            statusText: 'Hours Unknown',
            statusColor: 'gray',
            message: 'Opening hours not available'
        };
    }

    // Parse opening hours (format: "10:00 AM - 8:00 PM")
    const hoursMatch = openingHours.match(/(\d+:\d+\s*(?:AM|PM))\s*-\s*(\d+:\d+\s*(?:AM|PM))/i);

    if (!hoursMatch) {
        return {
            isOpen: false,
            statusText: 'Hours Unknown',
            statusColor: 'gray',
            message: 'Invalid hours format'
        };
    }

    const openTimeStr = hoursMatch[1];
    const closeTimeStr = hoursMatch[2];

    const openMinutes = parseTime(openTimeStr);
    const closeMinutes = parseTime(closeTimeStr);
    const currentMinutes = getCurrentTimeInMinutes();

    if (openMinutes === null || closeMinutes === null) {
        return {
            isOpen: false,
            statusText: 'Hours Unknown',
            statusColor: 'gray',
            message: 'Invalid time format'
        };
    }

    // Handle cases where closing time is past midnight
    let isOpen = false;
    if (closeMinutes < openMinutes) {
        // Closes after midnight (e.g., 10:00 AM - 2:00 AM)
        isOpen = currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
    } else {
        isOpen = currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    }

    const openTimeFormatted = formatMinutesToTime(openMinutes);
    const closeTimeFormatted = formatMinutesToTime(closeMinutes);

    return {
        isOpen,
        statusText: isOpen ? 'Open Now' : 'Closed',
        statusColor: isOpen ? 'green' : 'red',
        message: isOpen
            ? `closes at ${closeTimeFormatted}`
            : `opens at ${openTimeFormatted}`,
        openTime: openTimeFormatted,
        closeTime: closeTimeFormatted
    };
};

// Component for displaying opening status badge
export const OpeningStatusBadge = ({ openingHours, showMessage = true }) => {
    const status = getMarketOpeningStatus(openingHours);

    const colorClasses = {
        green: 'bg-green-100 text-green-700 border-green-200',
        red: 'bg-red-100 text-red-700 border-red-200',
        gray: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    const dotColors = {
        green: 'bg-green-500',
        red: 'bg-red-500',
        gray: 'bg-gray-400'
    };

    return (
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${colorClasses[status.statusColor]} border w-fit`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotColors[status.statusColor]} ${status.isOpen ? 'animate-pulse' : ''}`}></div>
            <span className="text-xs font-medium">{status.statusText}</span>
            {showMessage && status.message && (
                <span className="text-xs text-gray-500 ml-1">({status.message})</span>
            )}
        </div>
    );
};

export default OpeningStatusBadge;
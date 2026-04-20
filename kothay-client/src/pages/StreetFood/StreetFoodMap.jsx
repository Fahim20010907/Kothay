// src/pages/StreetFood/StreetFoodMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStallCoordinates } from './locationCoordinates';
import { FiSearch, FiX, FiNavigation, FiStar } from 'react-icons/fi';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Dhaka city bounds (restrict map to Dhaka only)
const dhakaBounds = {
    north: 23.95,
    south: 23.68,
    west: 90.32,
    east: 90.48
};

// Custom marker icons based on rating
const getMarkerIcon = (rating, isHighlighted = false) => {
    if (isHighlighted) {
        return L.divIcon({
            html: `<div style="background-color: #8b5cf6; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 0 0 3px #f59e0b, 0 4px 8px rgba(0,0,0,0.2); font-size: 20px; font-weight: bold; color: white; animation: pulse 1s infinite;">⭐</div>
                    <style>@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }</style>`,
            className: 'custom-marker highlighted',
            iconSize: [44, 44],
            popupAnchor: [0, -22]
        });
    }

    let color = '#22c55e';
    if (rating >= 4.8) color = '#ef4444';
    else if (rating >= 4.5) color = '#f97316';
    else if (rating >= 4.0) color = '#eab308';

    return L.divIcon({
        html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); font-size: 14px; font-weight: bold; color: white;">⭐</div>`,
        className: 'custom-marker',
        iconSize: [32, 32],
        popupAnchor: [0, -16]
    });
};

// Component to handle map view changes
const ChangeMapView = ({ center, zoom, onMapReady }) => {
    const map = useMap();
    useEffect(() => {
        if (center && map) {
            map.setView(center, zoom);
            if (onMapReady) onMapReady(map);
        }
    }, [center, zoom, map, onMapReady]);
    return null;
};

const getCategoryEmoji = (category) => {
    const emojis = {
        biriyani: '🍚',
        chaat: '🥗',
        'fast-food': '🍔',
        fuchka: '🍘',
        tea: '☕',
        sweets: '🍰',
        grill: '🍢'
    };
    return emojis[category] || '🍽️';
};

const StreetFoodMap = ({ stalls, onStallSelect, userLocation, setUserLocation }) => {
    const [searchRadius, setSearchRadius] = useState(1);
    const [showNearby, setShowNearby] = useState(false);
    const [mapCenter, setMapCenter] = useState([23.8103, 90.4125]);
    const [mapZoom, setMapZoom] = useState(12);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [highlightedStallId, setHighlightedStallId] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const searchRef = useRef(null);

    // Get user's current location
    const getUserLocation = () => {
        setGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(userLoc);
                    setMapCenter([userLoc.lat, userLoc.lng]);
                    setMapZoom(14);
                    setGettingLocation(false);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location. Please enable location access.');
                    setGettingLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setGettingLocation(false);
        }
    };

    // Calculate distance between two coordinates (in km)
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Get real coordinates for a stall based on its location
    const getStallCoordinatesFromLocation = (stall) => {
        return getStallCoordinates(stall);
    };

    // Process stalls with real coordinates
    const stallsWithCoords = stalls.map((stall) => {
        const coords = getStallCoordinatesFromLocation(stall);
        return {
            ...stall,
            lat: coords.lat,
            lng: coords.lng
        };
    });

    // Filter stalls by distance if showNearby is true
    const filteredStalls = showNearby && userLocation
        ? stallsWithCoords.filter((stall) => {
            const distance = getDistance(
                userLocation.lat, userLocation.lng,
                stall.lat, stall.lng
            );
            stall.distance = distance;
            return distance <= searchRadius;
        })
        : stallsWithCoords;

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            const results = stallsWithCoords.filter(stall =>
                stall.name.toLowerCase().includes(query.toLowerCase()) ||
                stall.location.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
            setHighlightedStallId(null);
        }
    };

    // Handle search result selection - ONLY centers map, DOES NOT navigate
    const handleSearchSelect = (stall) => {
        setSearchQuery(stall.name);
        setShowSearchResults(false);
        setHighlightedStallId(stall._id);
        setMapCenter([stall.lat, stall.lng]);
        setMapZoom(16);

        // Close nearby search if open
        setShowNearby(false);
    };

    // Auto-open popup for highlighted stall after map centers
    useEffect(() => {
        if (highlightedStallId && mapInstance) {
            const timer = setTimeout(() => {
                const stall = stallsWithCoords.find(s => s._id === highlightedStallId);
                if (stall && mapInstance) {
                    const popup = L.popup()
                        .setLatLng([stall.lat, stall.lng])
                        .setContent(`
                            <div class="p-2 min-w-[220px]">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-2xl">${getCategoryEmoji(stall.category)}</span>
                                    <h3 class="font-bold text-gray-800">${stall.name}</h3>
                                </div>
                                <div class="flex items-center gap-2 text-sm mb-2">
                                    <span class="text-amber-500">⭐ ${stall.rating}</span>
                                    <span>•</span>
                                    <span class="text-gray-500">${stall.reviews} reviews</span>
                                </div>
                                <p class="text-xs text-gray-500 mb-2">${stall.location}</p>
                                ${stall.distance ? `<p class="text-xs text-teal-600 mb-2">📍 ${stall.distance.toFixed(1)} km away</p>` : ''}
                                <div class="space-y-2 mt-2">
                                    <button class="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-1.5 rounded-lg transition flex items-center justify-center gap-2"
                                        onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${stall.lat},${stall.lng}', '_blank')">
                                        🗺️ Get Directions
                                    </button>
                                    <button class="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold py-1.5 rounded-lg transition flex items-center justify-center gap-2"
                                        onclick="window.dispatchEvent(new CustomEvent('viewDetails', { detail: { stallId: '${stall._id}' } }))">
                                        ⭐ View Details
                                    </button>
                                </div>
                            </div>
                        `)
                        .openOn(mapInstance);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [highlightedStallId, mapInstance, stallsWithCoords]);

    // Listen for custom event to navigate to details
    useEffect(() => {
        const handleViewDetails = (e) => {
            const stall = stallsWithCoords.find(s => s._id === e.detail.stallId);
            if (stall && onStallSelect) {
                onStallSelect(stall);
            }
        };
        window.addEventListener('viewDetails', handleViewDetails);
        return () => window.removeEventListener('viewDetails', handleViewDetails);
    }, [stallsWithCoords, onStallSelect]);

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
        setHighlightedStallId(null);
    };

    // Handle click outside search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-4">
            {/* Search Bar - Prominent */}
            <div className="relative" ref={searchRef}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍 Search for a food spot by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-5 py-3 pl-12 pr-10 bg-white border border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-800"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <FiX className="text-lg" />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                        {searchResults.map((stall) => (
                            <button
                                key={stall._id}
                                onClick={() => handleSearchSelect(stall)}
                                className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                            >
                                <span className="text-2xl">
                                    {stall.category === 'biriyani' && '🍚'}
                                    {stall.category === 'fuchka' && '🍘'}
                                    {stall.category === 'fast-food' && '🍔'}
                                    {(stall.category === 'burger') && '🍔'}
                                    {stall.category === 'chaat' && '🥗'}
                                    {stall.category === 'tea' && '☕'}
                                    {stall.category === 'sweets' && '🍰'}
                                    {stall.category === 'grill' && '🍢'}
                                </span>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{stall.name}</p>
                                    <p className="text-xs text-gray-500">{stall.location}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-amber-500">⭐</span>
                                    <span className="text-sm text-gray-600">{stall.rating}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {showSearchResults && searchResults.length === 0 && searchQuery.trim().length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center z-50">
                        <p className="text-gray-500">No food spots found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={getUserLocation}
                        disabled={gettingLocation}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                    >
                        <FiNavigation className="text-sm" />
                        {gettingLocation ? 'Getting Location...' : 'My Location'}
                    </button>

                    <button
                        onClick={() => setShowNearby(!showNearby)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${showNearby
                            ? 'bg-amber-500 text-gray-900'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        🔍 Nearby Spots
                    </button>
                </div>

                <div className="text-amber-600 font-bold">
                    {showNearby && userLocation && (
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Radius:</label>
                            <select
                                value={searchRadius}
                                onChange={(e) => setSearchRadius(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value={0.5}>0.5 km</option>
                                <option value={1}>1 km</option>
                                <option value={2}>2 km</option>
                                <option value={3}>3 km</option>
                                <option value={5}>5 km</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: '500px', width: '100%' }}
                    zoomControl={true}
                    maxBounds={dhakaBounds}
                    maxBoundsViscosity={1.0}
                    minZoom={11}
                    maxZoom={16}
                >
                    <ChangeMapView center={mapCenter} zoom={mapZoom} onMapReady={setMapInstance} />

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {userLocation && showNearby && (
                        <Circle
                            center={[userLocation.lat, userLocation.lng]}
                            radius={searchRadius * 1000}
                            pathOptions={{
                                fillColor: '#f59e0b',
                                fillOpacity: 0.1,
                                color: '#f59e0b',
                                weight: 2,
                                opacity: 0.5
                            }}
                        />
                    )}

                    {userLocation && (
                        <Marker
                            position={[userLocation.lat, userLocation.lng]}
                            icon={L.divIcon({
                                html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #3b82f6;"></div>`,
                                className: 'user-location-marker',
                                iconSize: [20, 20]
                            })}
                        >
                            <Popup>
                                <div className="text-center">
                                    <p className="font-semibold">Your Location</p>
                                    {showNearby && <p className="text-xs text-gray-500">Searching within {searchRadius}km</p>}
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {filteredStalls.map((stall) => (
                        <Marker
                            key={stall._id}
                            position={[stall.lat, stall.lng]}
                            icon={getMarkerIcon(stall.rating, highlightedStallId === stall._id)}
                        >
                            <Popup>
                                <div className="p-2 min-w-[220px]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{getCategoryEmoji(stall.category)}</span>
                                        <h3 className="font-bold text-gray-800">{stall.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm mb-2">
                                        <span className="text-amber-500">⭐ {stall.rating}</span>
                                        <span>•</span>
                                        <span className="text-gray-500">{stall.reviews} reviews</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">{stall.location}</p>
                                    {stall.distance && (
                                        <p className="text-xs text-teal-600 mb-2">📍 {stall.distance.toFixed(1)} km away</p>
                                    )}
                                    <div className="space-y-2 mt-2">
                                        <button
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${stall.lat},${stall.lng}`;
                                                window.open(url, '_blank');
                                            }}
                                            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-1.5 rounded-lg transition flex items-center justify-center gap-2"
                                        >
                                            <FiNavigation className="text-xs" /> Get Directions
                                        </button>
                                        <button
                                            onClick={() => onStallSelect?.(stall)}
                                            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm font-semibold py-1.5 rounded-lg transition flex items-center justify-center gap-2"
                                        >
                                            <FiStar className="text-xs" /> View Details
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
                    <span className="text-gray-700">⭐ 4.8+ <span className="text-gray-400">(Outstanding)</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
                    <span className="text-gray-700">⭐ 4.5+ <span className="text-gray-400">(Very Good)</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm"></div>
                    <span className="text-gray-700">⭐ 4.0+ <span className="text-gray-400">(Good)</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
                    <span className="text-gray-700">⭐ 3.0+ <span className="text-gray-400">(Average)</span></span>
                </div>
            </div>
        </div>
    );
};

export default StreetFoodMap;
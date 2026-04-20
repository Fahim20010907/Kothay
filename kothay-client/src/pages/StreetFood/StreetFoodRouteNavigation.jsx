// src/pages/StreetFood/StreetFoodRouteNavigation.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { FiNavigation, FiMapPin, FiCompass, FiAlertCircle, FiTarget, FiX } from 'react-icons/fi';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to add routing control
const RoutingControl = ({ origin, destination }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !origin || !destination) return;

        // Create routing control
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(origin.lat, origin.lng),
                L.latLng(destination.lat, destination.lng)
            ],
            routeWhileDragging: true,
            showAlternatives: true,
            fitSelectedRoutes: true,
            lineOptions: {
                styles: [{ color: '#f97316', weight: 4, opacity: 0.7 }] // Orange color for street food
            },
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            })
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, origin, destination]);

    return null;
};

const StreetFoodRouteNavigation = ({ stallName, stallLocation, stallCoordinates }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [locationError, setLocationError] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    // Use provided coordinates or fallback to Dhaka center
    const getDestinationCoords = () => {
        if (stallCoordinates) {
            return stallCoordinates;
        }
        // Fallback coordinates for Dhaka
        return { lat: 23.8103, lng: 90.4125, address: 'Dhaka, Bangladesh' };
    };

    const getUserLocation = () => {
        setLoading(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLoc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserLocation(userLoc);

                // Calculate approximate distance
                const dest = getDestinationCoords();
                const dist = calculateDistance(userLoc.lat, userLoc.lng, dest.lat, dest.lng);
                setDistance(dist);
                setDuration(Math.round(dist / 30 * 60)); // Assuming 30 km/h average speed

                setDestinationCoords(dest);
                setShowMap(true);
                setLoading(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Please allow location access to get directions');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Location information is unavailable');
                        break;
                    case error.TIMEOUT:
                        setLocationError('Location request timed out');
                        break;
                    default:
                        setLocationError('Unable to get your location');
                }
                setLoading(false);
            }
        );
    };

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const openInGoogleMaps = () => {
        const dest = getDestinationCoords();
        const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}`;
        window.open(url, '_blank');
    };

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${Math.round(minutes)} min`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
    };

    return (
        <div className="mt-4 border-t border-gray-100 pt-4">
            {/* Navigation Button */}
            {!showMap && (
                <button
                    onClick={getUserLocation}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Getting your location...
                        </>
                    ) : (
                        <>
                            <FiNavigation className="text-base" />
                            Get Directions to {stallName}
                        </>
                    )}
                </button>
            )}

            {/* Location Error */}
            {locationError && !showMap && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700">
                        <FiAlertCircle />
                        <p className="text-sm">{locationError}</p>
                    </div>
                    <button
                        onClick={openInGoogleMaps}
                        className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                        Open in Google Maps instead →
                    </button>
                </div>
            )}

            {/* Map and Directions */}
            {showMap && userLocation && destinationCoords && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                    {/* Distance and Time Info */}
                    <div className="bg-orange-50 rounded-lg p-3 mb-3 border border-orange-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xs text-orange-600 flex items-center justify-center gap-1">
                                    <FiTarget className="text-xs" />
                                    Distance
                                </p>
                                <p className="text-lg font-bold text-orange-700">{distance?.toFixed(1)} km</p>
                            </div>
                            <div>
                                <p className="text-xs text-orange-600 flex items-center justify-center gap-1">
                                    <FiCompass className="text-xs" />
                                    Est. Travel Time
                                </p>
                                <p className="text-lg font-bold text-orange-700">
                                    {formatDuration(duration)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md" style={{ height: '300px', width: '100%' }}>
                        <MapContainer
                            center={[userLocation.lat, userLocation.lng]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[userLocation.lat, userLocation.lng]}>
                                <Popup>Your Location</Popup>
                            </Marker>
                            <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
                                <Popup>{stallName}</Popup>
                            </Marker>
                            <RoutingControl
                                origin={userLocation}
                                destination={destinationCoords}
                            />
                        </MapContainer>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={openInGoogleMaps}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <FiMapPin />
                            Open in Google Maps
                        </button>
                        <button
                            onClick={() => setShowMap(false)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <FiX />
                            Close
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-2">
                        *Directions are approximate. Actual travel time may vary.
                    </p>
                </div>
            )}
        </div>
    );
};

export default StreetFoodRouteNavigation;
// src/pages/Vendor/VendorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiCheckCircle, FiTag } from 'react-icons/fi';

const VendorCard = ({ vendor, marketId, marketName }) => {
    const getPriceColor = (price) => {
        switch (price) {
            case 'Affordable': return 'text-green-600 bg-green-100';
            case 'Mid-range': return 'text-blue-600 bg-blue-100';
            case 'Premium': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'text-green-600 bg-green-100';
        if (rating >= 4.0) return 'text-blue-600 bg-blue-100';
        return 'text-yellow-600 bg-yellow-100';
    };

    const vendorId = vendor._id || `${marketId}_${vendor.name.replace(/\s/g, '-').toLowerCase()}`;

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-200 group">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                            {vendor.name}
                        </h4>
                        {vendor.isVerified && (
                            <FiCheckCircle className="text-green-500 text-sm" title="Verified Vendor" />
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <FiMapPin className="text-xs" /> Stall {vendor.stallNo}
                        {vendor.category && (
                            <>
                                <span className="text-gray-300">•</span>
                                <FiTag className="text-xs" /> {vendor.category}
                            </>
                        )}
                    </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(vendor.rating)}`}>
                    ⭐ {vendor.rating}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                {vendor.products?.slice(0, 3).map((product, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.name}
                    </span>
                ))}
                {vendor.products?.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{vendor.products.length - 3}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriceColor(vendor.priceRange)}`}>
                    {vendor.priceRange || 'N/A'}
                </span>
                <Link to={`/markets/${marketId}/vendor/${vendorId}`}>
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium hover:underline">
                        View Details →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VendorCard;
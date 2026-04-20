// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import KothayLogo from '../KothayLogo/KothayLogo';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logOut, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get user display name
    const userDisplayName = user?.fullName || user?.name || user?.email?.split('@')[0] || 'User';

    // All nav items
    const allNavItems = [
        { path: '/', label: 'Home', protected: false },
        { path: '/markets', label: 'Markets', protected: true },
        { path: '/street-food', label: 'Street Food', protected: true },

        // Change this line in allNavItems array:
        { path: '/watchlist', label: 'Personal Watchlist', protected: true },  // Changed from 'dashboard'

        // Also update the route path in main.jsx later
        { path: '/admin', label: 'Admin Panel', protected: true, adminOnly: true },
    ];

    // Filter nav items based on auth status and admin status
    const navItems = allNavItems.filter(item => {
        if (item.protected && !user) return false;
        if (item.adminOnly && !isAdmin) return false;
        return true;
    });

    const navLinkClass = ({ isActive }) => `
        relative px-4 py-2 rounded-lg font-medium transition-all duration-300
        ${isActive
            ? 'text-amber-400'
            : 'text-gray-200 hover:text-amber-400'
        }
        after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-amber-400 after:transition-all after:duration-300
        ${isActive ? 'after:w-6' : 'hover:after:w-6'}
    `;

    const handleLogout = async () => {
        await logOut();
    };

    return (
        <>
            {/* Spacer div to prevent content from hiding under fixed navbar */}
            <div className={`${scrolled ? 'h-16' : 'h-20'}`}></div>

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-teal-900/95 backdrop-blur-sm shadow-lg py-3'
                : 'bg-gradient-to-r from-gray-700 via-teal-800 to-teal-950 py-5'
                }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="transform transition-transform duration-300 hover:scale-105">
                            <KothayLogo />
                        </div>

                        {/* Desktop Menu - Centered */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={navLinkClass}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Auth Section - Desktop */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                // Logged in state - Minimal Elegant Style
                                <div className="hidden lg:flex items-center gap-3">
                                    <div className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
                                            {userDisplayName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-white text-sm font-medium">{userDisplayName}</p>
                                        </div>
                                    </div>
                                    <div className="w-px h-6 bg-white/20"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 text-amber-400 text-sm font-medium hover:bg-white/5 hover:text-red-400 hover:cursor-pointer transition-all duration-300"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                // Logged out state
                                <Link
                                    to="/login"
                                    className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <FiUser className="text-sm" />
                                    <span>Sign In</span>
                                </Link>
                            )}

                            {/* Mobile Menu Toggle Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden text-gray-200 hover:text-amber-400 transition-colors p-2 focus:outline-none"
                            >
                                {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu - With Scroll */}
                    <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[80vh] overflow-y-auto mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col space-y-2 pb-5">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `
                                        px-4 py-3 rounded-xl font-medium transition-all duration-300
                                        ${isActive
                                            ? 'bg-amber-500/20 text-amber-400 border-l-4 border-amber-400'
                                            : 'text-gray-200 hover:bg-teal-700/50 hover:text-amber-400'
                                        }
                                    `}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Mobile Auth Section - With Avatar and Name */}
                            {user ? (
                                <>
                                    <div className="px-4 py-3 border-t border-teal-700 mt-2 pt-3">
                                        <div className="flex items-center gap-3 bg-teal-700/50 rounded-full px-3 py-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                                {userDisplayName.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-gray-200 text-sm font-medium">
                                                {userDisplayName}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-semibold px-4 py-3 rounded-lg text-center mt-2 flex items-center justify-center gap-2"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-4 py-3 rounded-xl text-center mt-3 flex items-center justify-center gap-2 transition-all duration-300"
                                >
                                    <FiUser />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
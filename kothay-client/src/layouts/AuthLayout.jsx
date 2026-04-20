// src/layouts/AuthLayout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import KothayLogo from '../pages/shared/KothayLogo/KothayLogo';
import useAuth from '../hooks/useAuth';
import AuthImg from '../../assets/authImage.png';

const AuthLayout = () => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // If user is logged in, redirect to home page
    if (!loading && user) {
        return <Navigate to="/" replace />;
    }

    // Show loading while checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-800 via-gray-900 to-teal-800">
            {/* Logo Section - Hero Style */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="text-center">
                    <div className="inline-block">
                        <KothayLogo />
                    </div>
                    <p className="text-amber-200 text-sm mt-2 font-semibold">Discover. Explore. Connect.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Image */}
                    <div
                        className="hidden lg:block relative"
                        data-aos="fade-right"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-amber-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <img
                                src={AuthImg}
                                alt="Authentication"
                                className="relative z-10 w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center ml-16">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
                                <div className="text-2xl font-bold text-amber-400">500+</div>
                                <div className="text-sm text-gray-300">Markets</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
                                <div className="text-2xl font-bold text-amber-400">10K+</div>
                                <div className="text-sm text-gray-300">Vendors</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
                                <div className="text-2xl font-bold text-amber-400">24/7</div>
                                <div className="text-sm text-gray-300">Community</div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Auth Form */}
                    <div
                        className="lg:pl-12 mx-4 sm:mx-8 md:mx-12"
                        data-aos="fade-left"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                    {isLoginPage ? (
                                        <>
                                            <span className="text-amber-400">Welcome</span> Back!
                                        </>
                                    ) : (
                                        <>
                                            Join <span className="text-amber-400">Kothay</span> Today!
                                        </>
                                    )}
                                </h2>
                                <p className="text-gray-300 text-sm sm:text-base">
                                    {isLoginPage
                                        ? 'Login to discover markets & food spots'
                                        : 'Create an account and join the community'}
                                </p>
                            </div>

                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
// src/pages/Authentication/Login/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'You have successfully logged in.',
                timer: 2000,
                showConfirmButton: false,
                background: '#1a2a3a',
                color: '#fff'
            });

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);

            // Check for blocked account error
            const errorMessage = error.message || error.response?.data?.message;

            if (errorMessage === 'Your account has been blocked. Please contact support.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Account Blocked',
                    text: 'Your account has been blocked. Please contact support for assistance.',
                    confirmButtonColor: '#f59e0b',
                    background: '#1a2a3a',
                    color: '#fff'
                });
            } else if (error.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#f59e0b',
                    background: '#1a2a3a',
                    color: '#fff'
                });
            } else if (error.response?.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: errorMessage || 'Your account has been restricted. Please contact support.',
                    confirmButtonColor: '#f59e0b',
                    background: '#1a2a3a',
                    color: '#fff'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'Please check your connection and try again.',
                    confirmButtonColor: '#f59e0b',
                    background: '#1a2a3a',
                    color: '#fff'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                {/* Email Field */}
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            placeholder="Enter your email"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Forgot Password & Remember Me */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="rounded bg-white/10 border-white/20 text-amber-500 focus:ring-amber-500" />
                        <span className="ml-2 text-sm text-gray-300">Remember me</span>
                    </label>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-amber-400 hover:text-amber-300 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-300 text-sm">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-amber-400 font-semibold hover:text-amber-300 hover:underline"
                    >
                        Register here
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default Login;
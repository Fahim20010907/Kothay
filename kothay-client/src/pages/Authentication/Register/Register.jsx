// src/pages/Authentication/Register/Register.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await createUser(data.email, data.password, data.fullName);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: `Welcome to Kothay, ${data.fullName}!`,
                timer: 2000,
                showConfirmButton: false,
                background: '#1a2a3a',
                color: '#fff'
            });

            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);

            // Error alert
            if (error.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.response?.data?.message || 'User already exists with this email.',
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
            {/* Join Us Badge */}
            <div className="flex justify-center mb-6">
                <span className="bg-amber-400/20 text-gray-300 text-xs font-semibold px-4 py-2 rounded-full border border-amber-400/30">
                    🍽️ Join <span className='text-amber-400 font-bold'>Kothay</span> Community
                </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Full Name Field */}
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                            {...register('fullName', {
                                required: 'Full name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name must be at least 3 characters'
                                }
                            })}
                            placeholder="Enter your full name"
                        />
                    </div>
                    {errors.fullName && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
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
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-gray-200 text-sm font-medium mb-1.5">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-400 transition-colors" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? 'Creating Account...' : 'Create Account'}
                        {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                {/* Login Redirect */}
                <p className="text-center text-gray-300 text-sm">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-amber-400 font-semibold hover:text-amber-300 hover:underline transition-all inline-flex items-center gap-1 group"
                    >
                        Sign in here
                        <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default Register;
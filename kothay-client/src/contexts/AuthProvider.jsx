// src/contexts/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = 'http://localhost:3000/api/auth';

// Admin email - hardcoded
const ADMIN_EMAIL = 'almahfuz0179@gmail.com';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check for existing token in localStorage
        const token = localStorage.getItem('kothay_token');

        if (token) {
            // Verify token and get user info
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                setIsAdmin(userData.email === ADMIN_EMAIL);
                localStorage.setItem('kothay_user', JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Token verification failed:', error);

            // If user is blocked, clear localStorage
            if (error.response?.status === 403) {
                localStorage.removeItem('kothay_token');
                localStorage.removeItem('kothay_user');
                setUser(null);
                setIsAdmin(false);
                alert('Your account has been blocked. Please contact support.');
            }
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('kothay_token', token);
                localStorage.setItem('kothay_user', JSON.stringify(user));
                setUser(user);
                setIsAdmin(user.email === ADMIN_EMAIL);
                return user;
            }
        } catch (error) {
            if (error.response?.status === 403) {
                throw new Error('Your account has been blocked. Please contact support.');
            }
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const createUser = async (email, password, fullName) => {
        const response = await axios.post(`${API_URL}/register`, { fullName, email, password });

        if (response.data.success) {
            const { token, user } = response.data;
            localStorage.setItem('kothay_token', token);
            localStorage.setItem('kothay_user', JSON.stringify(user));
            setUser(user);
            setIsAdmin(user.email === ADMIN_EMAIL);
            return user;
        }
        throw new Error(response.data.message);
    };

    const logOut = async () => {
        localStorage.removeItem('kothay_token');
        localStorage.removeItem('kothay_user');
        setUser(null);
        setIsAdmin(false);
    };

    const authInfo = {
        user,
        loading,
        isAdmin,
        signIn,
        createUser,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
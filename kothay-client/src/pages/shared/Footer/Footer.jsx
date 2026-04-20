// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiGithub, FiClock } from 'react-icons/fi';
import KothayLogo from '../KothayLogo/KothayLogo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/markets', label: 'Markets' },
        { path: '/community', label: 'Community' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
    ];

    const supportLinks = [
        { path: '/faq', label: 'FAQ' },
        { path: '/privacy', label: 'Privacy Policy' },
        { path: '/terms', label: 'Terms of Service' },
        { path: '/report', label: 'Report an Issue' },
    ];

    const socialLinks = [
        { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            {/* Main Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* About Section */}
                    <div className="space-y-5">
                        <KothayLogo></KothayLogo>
                        <p className="text-sm leading-relaxed mt-3">
                            Your trusted market intelligence platform for finding the best markets,
                            vendors, and street food spots in Dhaka. Real prices, real reviews, real insights.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 transform hover:scale-110 inline-block"
                                        aria-label={social.label}
                                    >
                                        <Icon className="text-xl" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 group">
                                <FiMapPin className="text-amber-400 mt-1 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-gray-400 group-hover:text-gray-300">
                                    Dhaka, Bangladesh
                                </span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <FiPhone className="text-amber-400 group-hover:scale-110 transition-transform" />
                                <a href="tel:+880123456789" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                                    +880 1234 56789
                                </a>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <FiMail className="text-amber-400 group-hover:scale-110 transition-transform" />
                                <a href="mailto:info@kothay.com" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                                    info@kothay.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <FiClock className="text-amber-400 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="text-sm text-gray-400">
                                    <p>Mon-Fri: 9AM - 8PM</p>
                                    <p>Sat-Sun: 10AM - 6PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-teal-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-amber-400 text-center md:text-left">
                            © {currentYear} Kothay. All rights reserved. Market Intelligence Platform
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-xs text-gray-400 hover:text-amber-400 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-xs text-gray-400 hover:text-amber-400 transition-colors">
                                Terms
                            </Link>
                            <Link to="/sitemap" className="text-xs text-gray-400 hover:text-amber-400 transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
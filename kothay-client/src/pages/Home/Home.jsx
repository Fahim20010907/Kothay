// Home.jsx - Complete working version
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiTrendingUp, FiUsers, FiStar, FiClock, FiThumbsUp, FiArrowRight } from 'react-icons/fi';
import { getMarkets } from '../../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [popularMarkets, setPopularMarkets] = useState([]);
    const [loadingMarkets, setLoadingMarkets] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        fetchPopularMarkets();
    }, []);

    const fetchPopularMarkets = async () => {
        try {
            const data = await getMarkets('all');
            setPopularMarkets(data.slice(0, 4));
        } catch (error) {
            console.error('Error fetching markets:', error);
        } finally {
            setLoadingMarkets(false);
        }
    };

    const features = [
        {
            icon: FiMapPin,
            title: 'Market Discovery',
            description: 'Find markets and vendors on interactive map. Search by products, categories, and location.',
        },
        {
            icon: FiTrendingUp,
            title: 'Price Intelligence',
            description: 'Compare local market prices with online platforms. Know before you buy.',
        },
        {
            icon: FiUsers,
            title: 'Community Driven',
            description: 'Real reviews, ratings, and market conditions from real people.',
        }
    ];

    const stats = [
        { number: '500+', label: 'Markets', icon: FiMapPin },
        { number: '10K+', label: 'Vendors', icon: FiUsers },
        { number: '50K+', label: 'Active Users', icon: FiStar },
        { number: '100K+', label: 'Reviews', icon: FiThumbsUp }
    ];

    const howItWorks = [
        {
            step: '01',
            title: 'Search Markets',
            description: 'Search by product, category, or location to find the best markets',
            icon: FiSearch
        },
        {
            step: '02',
            title: 'Compare Prices',
            description: 'Check real-time prices and compare with online platforms',
            icon: FiTrendingUp
        },
        {
            step: '03',
            title: 'Visit & Review',
            description: 'Visit the market and share your experience with the community',
            icon: FiUsers
        }
    ];

    const testimonials = [
        {
            name: 'Rakib Hasan',
            location: 'Dhaka',
            rating: 5,
            comment: 'Kothay helped me find the best price for a laptop. Saved 5000 BDT compared to online!',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            name: 'Fatema Khan',
            location: 'Uttara',
            rating: 5,
            comment: 'Love the street food listings! Found amazing chaat spots I never knew existed.',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
            name: 'Shahidul Islam',
            location: 'Mirpur',
            rating: 4,
            comment: 'Accurate market information and helpful vendor profiles. Great platform!',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        }
    ];

    if (loadingMarkets) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-gray-50">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-bounce">📍</div>
                    <p className="text-gray-600 text-lg">Loading Kothay...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* Hero Section with Background Image */}
            <section className="relative text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/2132891/pexels-photo-2132891.jpeg?w=1600&h=900&fit=crop"
                        alt="Dhaka Market"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
                </div>

                <div className="absolute inset-0 opacity-30 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Find the Best Markets & <span className="text-amber-400">Street Food</span> in Dhaka
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8">
                            Real prices, real reviews, real insights. Discover markets, compare prices, and explore street food spots.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 text-lg text-gray-300">
                            <span className="bg-teal-900/50 backdrop-blur-sm px-3 py-1 rounded-full">Popular </span>
                            <button className="hover:text-amber-400 transition">Electronics</button>
                            <span>•</span>
                            <button className="hover:text-amber-400 transition">Clothing</button>
                            <span>•</span>
                            <button className="hover:text-amber-400 transition">Street Food</button>
                            <span>•</span>
                            <button className="hover:text-amber-400 transition">Watches</button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 via-white/50 to-transparent z-10"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Everything You Need to Shop Smart
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            Kothay provides all the tools and information you need to make informed shopping decisions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                        <Icon className="text-3xl text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* How It Works Section - Fixed */}
            <section className="py-24 bg-gradient-to-br from-emerald-950 via-teal-900 to-amber-700 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
                            <span className="text-amber-400 text-sm font-semibold">⚡ Simple & Easy</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            How <span className="text-amber-400">Kothay</span> Works
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-lg">
                            Three simple steps to discover the best markets and street food in Dhaka
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {howItWorks.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="relative text-center group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    {index < howItWorks.length - 1 && (
                                        <div className="hidden md:block absolute top-24 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-teal-500/50 via-amber-500/50 to-teal-500/50">
                                            <div className="absolute right-0 -top-1.5 w-3 h-3 bg-amber-400 rounded-full shadow-lg"></div>
                                        </div>
                                    )}

                                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 transition-all duration-300 group-hover:border-amber-400/50 group-hover:shadow-xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                                        <div className="relative z-10">
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-sm">{item.step}</span>
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <div className="relative w-24 h-24 mx-auto mb-5">
                                                    <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl group-hover:bg-amber-400/30 transition-all duration-500"></div>
                                                    <div className="relative w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                                        <Icon className="text-3xl text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {item.description}
                                            </p>
                                            <div className="w-12 h-px bg-white/20 mx-auto mt-4 rounded-full group-hover:bg-amber-400 transition-all duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="300">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg group"
                        >
                            Start Your Journey Now
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* Popular Markets Section - Improved */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-40 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-60 h-60 bg-teal-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header - Improved */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full mb-4">
                            <span className="text-amber-700 text-sm font-semibold">🔥 Top Picks</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            Popular <span className="text-amber-500">Markets</span> in Dhaka
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                            Most visited markets trusted by thousands of shoppers
                        </p>
                    </div>

                    {/* View All Button - Moved below header */}
                    <div className="flex justify-end mb-8" data-aos="fade-up">
                        <Link to="/markets" className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-all duration-300 bg-amber-50 hover:bg-amber-100 px-5 py-2 rounded-full">
                            <span>View All Markets</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Markets Grid - Improved Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularMarkets.map((market, index) => (
                            <div
                                key={market._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Image Container with Overlay */}
                                <div className="relative h-56 overflow-hidden">
                                    {market.image ? (
                                        <img
                                            src={market.image}
                                            alt={market.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                            <span className="text-white text-7xl">🏪</span>
                                        </div>
                                    )}
                                    {/* Dark Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Rating Badge */}
                                    <div className="absolute top-3 right-3 bg-amber-500 text-gray-900 px-2.5 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1">
                                        <FiStar className="text-xs fill-current" /> {market.rating}
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize shadow-md">
                                        {market.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Market Name */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-1">
                                        {market.name}
                                    </h3>

                                    {/* Location */}
                                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-1.5">
                                        <FiMapPin className="text-amber-500 text-sm" />
                                        <span>{market.location}</span>
                                    </p>

                                    {/* Popular Products */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {market.popularProducts?.slice(0, 3).map((product, idx) => (
                                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors duration-300">
                                                {product}
                                            </span>
                                        ))}
                                        {market.popularProducts?.length > 3 && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                                                +{market.popularProducts.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Vendor Info & View Button */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="text-xs text-gray-500">
                                            🏪 {market.vendors}+ Vendors
                                        </div>
                                        <Link to={`/markets/${market._id}`}>
                                            <button className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                                Details <FiArrowRight className="text-xs" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA within section */}
                    <div className="text-center mt-16" data-aos="fade-up">
                        <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
                        <Link to="/markets">
                            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                                Browse All Markets
                                <FiArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            {/* Stats Section - With Background Image */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/2132891/pexels-photo-2132891.jpeg"
                        alt="Market Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-900/60 to-blue-900/60"></div>
                </div>

                {/* Animated Blur Effects */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
                            <span className="text-amber-400 text-sm font-semibold">📊 Our Impact</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our <span className="text-amber-400">Achievements</span>
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-lg">
                            Numbers speak louder than words - our journey of excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-amber-400/50"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="text-2xl text-white" />
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                            {stat.number}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-200 mb-1 group-hover:text-amber-400 transition-colors duration-300">
                                            {stat.label}
                                        </h3>
                                        <div className="w-12 h-0.5 bg-white/20 mx-auto mt-4 rounded-full group-hover:bg-amber-400 transition-all duration-300"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-white/20">
                            <span className="text-amber-400 text-lg">⭐</span>
                            <span className="text-gray-300 text-sm">Trusted by <strong className="text-amber-400">10,000+</strong> happy shoppers</span>
                            <span className="text-amber-400 text-lg">⭐</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">Trusted by thousands of shoppers in Dhaka</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-amber-400" />
                                    <div>
                                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={`text-sm ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic leading-relaxed font-semibold">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Premium Design */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900/80 to-gray-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Dot Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <div data-aos="fade-up">
                        {/* Small Badge */}
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
                            <span className="text-emerald-300 text-sm font-semibold">🚀 Join Today</span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">
                            Ready to <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Discover</span> the Best Markets?
                        </h2>

                        {/* Description */}
                        <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
                            Join thousands of happy shoppers who find the best markets and street food spots in Dhaka with Kothay.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/register">
                                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Sign Up Free
                                </button>
                            </Link>
                            <Link to="/markets">
                                <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                                    Explore Markets
                                </button>
                            </Link>
                        </div>

                        {/* Trust Badge */}
                        <div className="mt-10 pt-6 border-t border-white/10 inline-flex flex-wrap items-center justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">✓</span>
                                <span className="text-gray-200 text-xs font-bold">Real Reviews</span>
                            </div>
                            <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">✓</span>
                                <span className="text-gray-200 text-xs font-bold">Price Comparison</span>
                            </div>
                            <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">✓</span>
                                <span className="text-gray-200 text-xs font-bold">Verified Vendors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
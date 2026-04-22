<section className="relative text-white overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
        <img
            src="https://images.pexels.com/photos/2132891/pexels-photo-2132891.jpeg?w=1920&h=1080&fit=crop"
            alt="Dhaka Market"
            className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
    </div>

    {/* Glow Effects */}
    <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-24 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    {/* Content */}
    <div className="w-full max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-6 py-24 md:py-32 relative z-10">

        <div className="text-center max-w-3xl mx-auto">

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Dhaka’s Hidden <br />
                <span className="text-amber-400">Markets & Street Food</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-300 mb-10">
                Compare real prices, explore authentic spots, and find the best deals — all in one place.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search markets, products, food..."
                        className="w-full bg-white text-gray-900 rounded-full py-4 pl-12 pr-28 shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />

                    {/* Icon */}
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    {/* Button */}
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-2 rounded-full transition-all duration-300">
                        Search
                    </button>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
                <span className="bg-white/10 backdrop-blur px-3 py-1 rounded-full">Popular:</span>
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

    {/* Bottom Fade */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/40 to-transparent z-10"></div>
</section>
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

// Middleware to verify admin
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usersCollection = req.app.locals.users;

        const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });

        if (!user || user.email !== 'almahfuz0179@gmail.com') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ============ USER MANAGEMENT ============

// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const usersCollection = req.app.locals.users;
        const users = await usersCollection.find({}).toArray();
        // Remove passwords from response
        const safeUsers = users.map(({ password, ...rest }) => rest);
        res.json({ success: true, data: safeUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Block/Unblock user
router.patch('/users/:id/block', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isBlocked } = req.body;
        const usersCollection = req.app.locals.users;

        await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { isBlocked: isBlocked } }
        );

        res.json({ success: true, message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ FOOD SPOT MANAGEMENT ============

// Get all food spots (including unverified)
router.get('/street-food', verifyAdmin, async (req, res) => {
    try {
        const streetFoodCollection = req.app.locals.streetFood;
        const spots = await streetFoodCollection.find({}).toArray();
        res.json({ success: true, data: spots });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete food spot
router.delete('/street-food/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const streetFoodCollection = req.app.locals.streetFood;

        const result = await streetFoodCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Food spot not found' });
        }
        res.json({ success: true, message: 'Food spot deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Verify food spot
router.patch('/street-food/:id/verify', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { verified } = req.body;
        const streetFoodCollection = req.app.locals.streetFood;

        const result = await streetFoodCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { verified: verified, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: 'Food spot not found' });
        }
        res.json({ success: true, message: `Food spot ${verified ? 'verified' : 'unverified'} successfully` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Edit food spot
router.patch('/street-food/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, area, description, priceRange, openingHours, crowdLevel, popularItems, category, image } = req.body;
        const streetFoodCollection = req.app.locals.streetFood;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (location !== undefined) updateData.location = location;
        if (area !== undefined) updateData.area = area;
        if (description !== undefined) updateData.description = description;
        if (priceRange !== undefined) updateData.priceRange = priceRange;
        if (openingHours !== undefined) updateData.openingHours = openingHours;
        if (crowdLevel !== undefined) updateData.crowdLevel = crowdLevel;
        if (popularItems !== undefined) updateData.popularItems = popularItems;
        if (category !== undefined) updateData.category = category;
        if (image !== undefined) updateData.image = image;
        updateData.updatedAt = new Date();

        const result = await streetFoodCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: 'Food spot not found' });
        }
        res.json({ success: true, message: 'Food spot updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ MARKET MANAGEMENT ============

// Get all markets
router.get('/markets', verifyAdmin, async (req, res) => {
    try {
        const marketsCollection = req.app.locals.markets;
        const markets = await marketsCollection.find({}).toArray();
        res.json({ success: true, data: markets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete market
router.delete('/markets/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const marketsCollection = req.app.locals.markets;

        const result = await marketsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Market not found' });
        }
        res.json({ success: true, message: 'Market deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Edit market
router.patch('/markets/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, category, priceLevel, openingHours, description, popularProducts, vendors, image, area, subCategories, rating, reviews } = req.body;
        const marketsCollection = req.app.locals.markets;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (location !== undefined) updateData.location = location;
        if (category !== undefined) updateData.category = category;
        if (priceLevel !== undefined) updateData.priceLevel = priceLevel;
        if (openingHours !== undefined) updateData.openingHours = openingHours;
        if (description !== undefined) updateData.description = description;
        if (popularProducts !== undefined) updateData.popularProducts = popularProducts;
        if (vendors !== undefined) updateData.vendors = vendors;
        if (image !== undefined) updateData.image = image;
        if (area !== undefined) updateData.area = area;
        if (subCategories !== undefined) updateData.subCategories = subCategories;
        if (rating !== undefined) updateData.rating = rating;
        if (reviews !== undefined) updateData.reviews = reviews;
        updateData.updatedAt = new Date();

        const result = await marketsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: 'Market not found' });
        }
        res.json({ success: true, message: 'Market updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ REVIEW MANAGEMENT ============

// Get all reviews with food spot names
router.get('/reviews', verifyAdmin, async (req, res) => {
    try {
        const reviewsCollection = req.app.locals.reviews;
        const streetFoodCollection = req.app.locals.streetFood;

        const reviews = await reviewsCollection.find({}).sort({ createdAt: -1 }).toArray();

        // Enrich reviews with food spot names
        const enrichedReviews = await Promise.all(reviews.map(async (review) => {
            if (review.stallId) {
                try {
                    const foodSpot = await streetFoodCollection.findOne({ _id: new ObjectId(review.stallId) });
                    return {
                        ...review,
                        foodSpotName: foodSpot?.name || 'Unknown'
                    };
                } catch (e) {
                    return {
                        ...review,
                        foodSpotName: 'Unknown'
                    };
                }
            }
            return {
                ...review,
                foodSpotName: null
            };
        }));

        res.json({ success: true, data: enrichedReviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete review
router.delete('/reviews/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const reviewsCollection = req.app.locals.reviews;

        const result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Also update the food stall's review count and rating
        const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
        if (review && review.stallId) {
            const streetFoodCollection = req.app.locals.streetFood;
            const remainingReviews = await reviewsCollection.find({ stallId: review.stallId }).toArray();
            const newReviewCount = remainingReviews.length;
            let newAverageRating = 0;
            if (newReviewCount > 0) {
                const sum = remainingReviews.reduce((acc, r) => acc + r.rating, 0);
                newAverageRating = sum / newReviewCount;
            }
            await streetFoodCollection.updateOne(
                { _id: new ObjectId(review.stallId) },
                { $set: { reviews: newReviewCount, rating: parseFloat(newAverageRating.toFixed(1)) } }
            );
        }

        res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
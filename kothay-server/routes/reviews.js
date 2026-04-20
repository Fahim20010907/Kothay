const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Get all reviews for a specific food stall (WITHOUT calculating average - just raw reviews)
router.get('/street-food/:stallId', async (req, res) => {
    try {
        const { stallId } = req.params;
        const reviewsCollection = req.app.locals.reviews;

        const reviews = await reviewsCollection
            .find({ stallId, type: 'street-food' })
            .sort({ createdAt: -1 }) // Newest first
            .toArray();

        res.json({
            success: true,
            data: reviews,
            totalReviews: reviews.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get reviews with average rating
router.get('/street-food/:stallId/summary', async (req, res) => {
    try {
        const { stallId } = req.params;
        const reviewsCollection = req.app.locals.reviews;

        const reviews = await reviewsCollection.find({ stallId, type: 'street-food' }).toArray();

        let averageRating = 0;
        if (reviews.length > 0) {
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            averageRating = sum / reviews.length;
        }

        res.json({
            success: true,
            data: reviews,
            averageRating: parseFloat(averageRating.toFixed(1)),
            totalReviews: reviews.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add a review for a food stall
router.post('/street-food/:stallId', async (req, res) => {
    try {
        const { stallId } = req.params;
        const { userName, rating, comment, userAvatar } = req.body;
        const reviewsCollection = req.app.locals.reviews;
        const streetFoodCollection = req.app.locals.streetFood;

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
        }

        // Check if stall exists
        const stall = await streetFoodCollection.findOne({ _id: new ObjectId(stallId) });
        if (!stall) {
            return res.status(404).json({ success: false, message: 'Food stall not found' });
        }

        // Create new review
        const newReview = {
            stallId,
            type: 'street-food',
            userName: userName || 'Anonymous User',
            userAvatar: userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}&background=teal&color=fff`,
            rating: parseInt(rating),
            comment,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await reviewsCollection.insertOne(newReview);

        // Get all reviews to calculate new average
        const allReviews = await reviewsCollection.find({ stallId, type: 'street-food' }).toArray();
        const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = sum / allReviews.length;

        // Update the stall's rating and reviews count
        await streetFoodCollection.updateOne(
            { _id: new ObjectId(stallId) },
            {
                $set: {
                    rating: parseFloat(averageRating.toFixed(1)),
                    reviews: allReviews.length
                }
            }
        );

        res.json({
            success: true,
            data: { _id: result.insertedId, ...newReview },
            averageRating: parseFloat(averageRating.toFixed(1)),
            totalReviews: allReviews.length
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
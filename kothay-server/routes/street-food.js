const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

// Get all street food stalls (with optional category filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const streetFoodCollection = req.app.locals.streetFood;

        // Check if user is admin
        const token = req.headers.authorization?.split(' ')[1];
        let isAdmin = false;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const usersCollection = req.app.locals.users;
                const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
                isAdmin = user?.email === 'almahfuz0179@gmail.com';
            } catch (e) {
                // Token invalid, treat as normal user
            }
        }

        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        // If not admin, only show verified spots
        if (!isAdmin) {
            query.verified = true;
        }

        const stalls = await streetFoodCollection.find(query).toArray();
        res.json({ success: true, data: stalls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single stall by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const streetFoodCollection = req.app.locals.streetFood;

        const stall = await streetFoodCollection.findOne({ _id: new ObjectId(id) });
        res.json({ success: true, data: stall });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add new street food stall
router.post('/', async (req, res) => {
    try {
        const streetFoodCollection = req.app.locals.streetFood;

        const newStall = {
            ...req.body,
            verified: false,
            latitude: req.body.latitude || null,
            longitude: req.body.longitude || null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await streetFoodCollection.insertOne(newStall);
        res.json({ success: true, data: { _id: result.insertedId, ...newStall } });
    } catch (error) {
        console.error('Error adding food spot:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update food stall (for coordinates)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { latitude, longitude } = req.body;
        const streetFoodCollection = req.app.locals.streetFood;

        const updateData = {};
        if (latitude !== undefined) updateData.latitude = latitude;
        if (longitude !== undefined) updateData.longitude = longitude;
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

// Seed street food data (for development - remove in production)
router.post('/seed', async (req, res) => {
    try {
        const streetFoodCollection = req.app.locals.streetFood;

        // Clear existing data
        await streetFoodCollection.deleteMany({});

        // Insert new data
        const result = await streetFoodCollection.insertMany(req.body);
        res.json({ success: true, inserted: result.insertedCount });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
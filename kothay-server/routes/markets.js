const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // ✅ ADD THIS

// Get all markets (with optional category filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const marketsCollection = req.app.locals.markets;

        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        const markets = await marketsCollection.find(query).toArray();
        res.json({ success: true, data: markets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single market by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const marketsCollection = req.app.locals.markets;

        const market = await marketsCollection.findOne({ _id: new ObjectId(id) });
        res.json({ success: true, data: market });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Seed markets data (for development)
router.post('/seed', async (req, res) => {
    try {
        const marketsCollection = req.app.locals.markets;

        // Clear existing data
        await marketsCollection.deleteMany({});

        // Insert new data
        const result = await marketsCollection.insertMany(req.body);
        res.json({ success: true, inserted: result.insertedCount });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update market (add vendors, etc.)
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { vendorsList } = req.body;
        const marketsCollection = req.app.locals.markets;

        const updateData = {};
        if (vendorsList !== undefined) updateData.vendorsList = vendorsList;
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

module.exports = router;
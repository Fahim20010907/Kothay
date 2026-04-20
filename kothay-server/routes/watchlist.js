const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

// Middleware to verify user
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usersCollection = req.app.locals.users;
        const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Get user's watchlist
router.get('/', verifyUser, async (req, res) => {
    try {
        const watchlist = req.user.watchlist || [];
        res.json({ success: true, data: watchlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add to watchlist
router.post('/', verifyUser, async (req, res) => {
    try {
        const { vendorId, vendorType, vendorName, vendorLocation, note } = req.body;
        const usersCollection = req.app.locals.users;

        const watchlistItem = {
            _id: new ObjectId(),
            vendorId,
            vendorType,
            vendorName,
            vendorLocation,
            note: note || '',
            reminderDate: null,
            savedAt: new Date()
        };

        await usersCollection.updateOne(
            { _id: req.user._id },
            { $push: { watchlist: watchlistItem } }
        );

        res.json({ success: true, data: watchlistItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove from watchlist
router.delete('/:id', verifyUser, async (req, res) => {
    try {
        const { id } = req.params;
        const usersCollection = req.app.locals.users;

        await usersCollection.updateOne(
            { _id: req.user._id },
            { $pull: { watchlist: { _id: new ObjectId(id) } } }
        );

        res.json({ success: true, message: 'Removed from watchlist' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update note
router.patch('/:id/note', verifyUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        const usersCollection = req.app.locals.users;

        await usersCollection.updateOne(
            { _id: req.user._id, 'watchlist._id': new ObjectId(id) },
            { $set: { 'watchlist.$.note': note } }
        );

        res.json({ success: true, message: 'Note updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Set reminder
router.patch('/:id/reminder', verifyUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { reminderDate } = req.body;
        const usersCollection = req.app.locals.users;

        await usersCollection.updateOne(
            { _id: req.user._id, 'watchlist._id': new ObjectId(id) },
            { $set: { 'watchlist.$.reminderDate': reminderDate } }
        );

        res.json({ success: true, message: 'Reminder set' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
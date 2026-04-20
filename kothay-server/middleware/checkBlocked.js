const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const checkBlocked = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usersCollection = req.app.locals.users;

        const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });

        if (user && user.isBlocked === true) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been blocked. Please contact support.'
            });
        }

        next();
    } catch (error) {
        next();
    }
};

module.exports = checkBlocked;
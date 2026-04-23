const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000;
const checkBlocked = require('./middleware/checkBlocked');
const watchlistRoutes = require('./routes/watchlist');

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://kothay-client.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqllmqp.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Make the client accessible
app.locals.client = client;

// Database connection flag
let isDbConnected = false;

// Route handlers
const marketsRoutes = require('./routes/markets');
const streetFoodRoutes = require('./routes/street-food');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Apply routes AFTER database is connected
const applyRoutes = () => {
    app.use('/api/street-food', checkBlocked);
    app.use('/api/markets', checkBlocked);
    app.use('/api/reviews', checkBlocked);
    app.use('/api/users/watchlist', watchlistRoutes);
    app.use('/api/markets', marketsRoutes);
    app.use('/api/street-food', streetFoodRoutes);
    app.use('/api/reviews', reviewsRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);

    app.get('/', (req, res) => {
        res.send('Kothay API is running');
    });
};

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("kothay");
        app.locals.db = db;
        app.locals.markets = db.collection("markets");
        app.locals.streetFood = db.collection("streetFood");
        app.locals.users = db.collection("users");
        app.locals.reviews = db.collection("reviews");

        isDbConnected = true;

        // Apply routes only after DB is connected
        applyRoutes();

    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Kothay Server is running on port ${port}`);
        });
    });
}

// For Vercel serverless - ensure DB is connected before handling requests
const handler = async (req, res) => {
    if (!isDbConnected) {
        await connectDB();
    }
    return app(req, res);
};

// For Vercel deployment
module.exports = handler;
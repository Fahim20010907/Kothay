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
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqllmqp.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const db = client.db("kothay");
        const marketsCollection = db.collection("markets");
        const streetFoodCollection = db.collection("streetFood");
        const usersCollection = db.collection("users");
        const reviewsCollection = db.collection("reviews");

        // Make collections available to routes
        app.locals.db = db;
        app.locals.markets = marketsCollection;
        app.locals.streetFood = streetFoodCollection;
        app.locals.users = usersCollection;
        app.locals.reviews = reviewsCollection;

        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");

    } catch (error) {
        console.error("Database connection error:", error);
    }
}
run();

// Routes
const marketsRoutes = require('./routes/markets');
const streetFoodRoutes = require('./routes/street-food');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Apply checkBlocked middleware to protected routes
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
})

app.listen(port, () => {
    console.log(`Kothay Server is running on port ${port}`);
})
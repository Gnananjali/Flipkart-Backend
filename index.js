const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cartRoutes = require("./cart"); // ✅ Require routes

const app = express(); // ✅ app must be initialized before using it

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", cartRoutes); // ✅ Use routes after app is defined

// Connect to MongoDB
mongoose.connect("your-mongodb-url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connection is successful
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("MongoDB connection failed:", err);
});

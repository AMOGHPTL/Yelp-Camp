import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Campground from "./model/campgrounds.js";
import ExpressError from "./utils/ExpressError.js";
import Review from "./model/review.js";
import campgrounds from "./routes/campgrounds.js"
import reviews from "./routes/reviews.js"

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("CONNECTED TO MONGO");
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e.message);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/campgrounds' , campgrounds);
app.use('/campgrounds/:id/reviews', reviews)

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  console.error(`[ERROR] ${status}: ${message}`);
  res.status(status).json({ error: message });
});

// Start server
app.listen(5000, () => {
  console.log("Serving on port 5000");
});

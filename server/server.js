import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Campground from "./model/campgrounds.js";
import ExpressError from "./utils/ExpressError.js";

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
app.get("/campgrounds", async (req, res, next) => {
  try {
    const campgrounds = await Campground.find();
    res.status(200).send(campgrounds);
  } catch (e) {
    next(new ExpressError("Failed to fetch campgrounds", 500));
  }
});

app.get("/campgrounds/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) throw new ExpressError("Campground not found", 404);
    res.status(200).send(campground);
  } catch (e) {
    next(e);
  }
});

app.put("/campgrounds/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCamp = await Campground.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCamp) throw new ExpressError("Campground not found", 404);
    res.status(200).send(updatedCamp);
  } catch (e) {
    next(e);
  }
});

app.delete("/campgrounds/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCampground = await Campground.findByIdAndDelete(id);
    if (!deletedCampground)
      throw new ExpressError("Campground not found", 404);
    res.status(200).send({ message: "Campground deleted" });
  } catch (e) {
    next(e);
  }
});

app.post("/campgrounds/new", async (req, res, next) => {
  try {
    const { title, location, price, description, image } = req.body;
    if (!title || !location || !price || !description || !image) {
      throw new ExpressError("Missing required fields", 400);
    }
    const newCampground = new Campground({
      title,
      location,
      price,
      description,
      image,
    });
    await newCampground.save();
    res.status(201).send(newCampground);
  } catch (e) {
    next(e);
  }
});

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

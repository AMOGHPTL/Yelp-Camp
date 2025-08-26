import express from "express";
import Campground from "../model/campgrounds.js";
import ExpressError from "../utils/ExpressError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const campgrounds = await Campground.find();
    res.status(200).send(campgrounds);
  } catch (e) {
    next(new ExpressError("Failed to fetch campgrounds", 500));
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) throw new ExpressError("Campground not found", 404);
    res.status(200).send(campground);
  } catch (e) {
    next(e);
  }
});

router.put("/:id/edit", async (req, res, next) => {
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

router.delete("/:id/delete", async (req, res, next) => {
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

router.post("/new", async (req, res, next) => {
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

export default router;
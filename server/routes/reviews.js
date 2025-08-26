import express from "express";
import Review from "../model/review.js";
import Campground from "../model/campgrounds.js";
import ExpressError from "../utils/ExpressError.js";

const router = express.Router({mergeParams: true});

router.post("/", async(req,res,next) => {
  try{
  const {id} = req.params;
  const {review,rating} = req.body;
  if(!id || !review || !rating){
    throw new ExpressError("missing required feilds",400);
  }
  const campground = await Campground.findById(id);
  const newReview = new Review({review,rating});
  campground.reviews.push(newReview);
  await newReview.save();
  await campground.save();
  res.status(200).send({message:"review added"}) 
  } catch(e){
    next(e)
  }
})

router.delete('/:reviewID', async(req,res,next) => {
  try{
    const {id,reviewID} = req.params;
  const updatedCamp = await Campground.findByIdAndUpdate(id,{$pull: {reviews: reviewID}})
  const deletedReview = await Review.findByIdAndDelete(reviewID);
  if(!updatedCamp|| !deletedReview){
    throw new ExpressError("Campground not found", 404);
  }
  res.status(200).send({message:"the review was deleted"})
  } catch(e){
    next(e)
  }
})

export default router;
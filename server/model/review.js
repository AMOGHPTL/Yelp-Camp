import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  review: String,
  rating: Number
})

const Review = mongoose.model('Review',reviewSchema);

export default Review;
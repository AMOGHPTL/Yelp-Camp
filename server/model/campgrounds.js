import mongoose from "mongoose";
import Review from "./review.js";

const Schema  = mongoose.Schema;

const CampgroundSchema = new Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true
    },
    // price: {
    //   type: Number,
    //   required: true,
    //   min: 0
    // },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]
  }
) 

CampgroundSchema.post('findOneAndDelete', async (campground) => {
  if(campground.reviews.length){
    const res = await Review.deleteMany({_id : {$in : campground.reviews}})
    console.log(res)
  }
})

const Campground =  mongoose.model("Campground",CampgroundSchema);

export default Campground;
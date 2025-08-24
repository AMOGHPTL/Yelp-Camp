import mongoose from "mongoose";

const Schema  = mongoose.Schema;

const CampgroundSchema = new Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
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
    }
  }
) 

const Campground =  mongoose.model("Campground",CampgroundSchema);

export default Campground;
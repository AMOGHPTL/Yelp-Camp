import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Campground from "./model/campgrounds.js"

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(console.log("CONNECTED TO MONGO")).catch(e=>{console.log("error connecting")});

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/campgrounds" , async (req,res) => {
    const campgrounds = await Campground.find();
    res.send(campgrounds);
})


app.listen(5000,()=>{console.log("serving on port 5000")});
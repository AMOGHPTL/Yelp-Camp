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

app.get("/campgrounds/:id" , async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.send(campground);
} )

app.put("/campgrounds/:id/edit" , async (req , res) => {
   const {id} = req.params;
   const campground = req.body;
   const updatedCamp = await Campground.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
   res.send(updatedCamp);
})

app.delete("/campgrounds/:id/delete" , async (req,res)=>{
    const {id} = req.params;
    const deletedCampgrond = await Campground.findByIdAndDelete(id);
    res.send("deleted");
})

app.post("/campgrounds/new" , async (req , res) => {
    const newCampground = new Campground(req.body);
    newCampground.save()
    res.send(newCampground);
})


app.listen(5000,()=>{console.log("serving on port 5000")});
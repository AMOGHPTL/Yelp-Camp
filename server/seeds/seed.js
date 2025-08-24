import mongoose  from 'mongoose';
import cities from "./ctites.js"
import {places,descriptors} from "./seedHelpers.js";
import Campground from "../model/campgrounds.js" 

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(console.log("CONNECTED TO MONGO")).catch(e=>{console.log("error connecting")});


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKviGAMqm3-vH3dMukJDJJEeQZJeiGthxBiQ&s`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta arcu vitae magna aliquam pulvinar. Nunc malesuada ultrices mattis. Sed."
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
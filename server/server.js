import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Campground from "./model/campgrounds.js";
import ExpressError from "./utils/ExpressError.js";
import Review from "./model/review.js";
import campgrounds from "./routes/campgrounds.js"
import reviews from "./routes/reviews.js";
import user from './routes/user.js'
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import localStrategy from 'passport-local';
import User from "./model/user.js";

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
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "thisisthesecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax', // Important for cross-origin requests
    maxAge: 1000 * 60 * 60
  }
}
app.use(session(sessionConfig));

app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
  res.locals.flash = req.flash('success');
  next();
})

// Routes
app.use('/campgrounds' , campgrounds);
app.use('/campgrounds/:id/reviews', reviews);
app.use('/', user);

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

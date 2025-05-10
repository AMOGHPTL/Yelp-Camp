import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCampground = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCampground = await axios.post(
      "http://localhost:5000/campgrounds/new",
      {
        title: title,
        location: location,
      }
    );
    navigate(`/campgrounds/${newCampground.data._id}`);
  };
  return (
    <div>
      <h1>Create new Campground</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="location">location</label>
        <input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <a href="/campgrounds">Cancel</a>
    </div>
  );
};

export default NewCampground;

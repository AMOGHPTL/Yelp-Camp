import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCampground = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // reset previous error

    try {
      const res = await axios.post("http://localhost:5000/campgrounds/new", {
        title,
        location,
        price,
        description,
        image,
      });

      // If backend sends proper 400/500 errors, this line won't run
      if (res.data && res.data._id) {
        navigate(`/campgrounds/${res.data._id}`);
      } else {
        setError("Something went wrong. Try again.");
        navigate("/test");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Failed to create campground. Please try again."
      );
      navigate("/test");
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    location.trim() !== "" &&
    description.trim() !== "" &&
    price > 0;

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[400px]">
        <h1 className="text-2xl font-semibold">Create New Campground</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="border p-2 text-sm"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="location">Location</label>
          <input
            className="border p-2 text-sm"
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label htmlFor="image">Image URL</label>
          <input
            className="border p-2 text-sm"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <input
            className="border p-2 text-sm"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label htmlFor="description">Description</label>
          <textarea
            className="border p-2 text-sm"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {isFormValid ? (
            <button
              className="bg-green-600 text-white mt-4 p-2 rounded-sm"
              type="submit"
            >
              Add
            </button>
          ) : (
            <button
              className="bg-gray-400 text-white mt-4 p-2 rounded-sm cursor-not-allowed"
              disabled
            >
              Fill All Fields
            </button>
          )}
        </form>

        {error && (
          <div className="text-red-600 font-semibold mt-2 text-sm">{error}</div>
        )}

        <button
          className="bg-red-600 text-white mt-2 p-2 rounded-sm"
          onClick={() => navigate("/campgrounds")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewCampground;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/campgrounds/${id}`);
        const data = res.data;
        setCamp(data);
        setTitle(data.title);
        setLocation(data.location);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load campground.");
        navigate("/test")
        setLoading(false);
      }
    };

    fetchCampground();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/campgrounds/${id}/edit`, {
        title,
        location,
        price,
        image,
        description,
      });
      navigate(`/campgrounds/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update campground. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[400px]">
        <h1 className="text-2xl font-semibold">Update your campground</h1>
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

          {title && location && price && description ? (
            <button className="bg-blue-600 text-white p-2 mt-4" type="submit">
              Update
            </button>
          ) : (
            <button
              className="bg-gray-400 text-white p-2 mt-4 cursor-not-allowed"
              disabled
            >
              Fill all fields
            </button>
          )}
        </form>

        <button
          className="bg-red-700 text-white p-2 mt-2 rounded-sm"
          onClick={() => navigate(`/campgrounds/${id}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateCampground;

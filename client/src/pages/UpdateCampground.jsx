import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchCampground = async () => {
      const campground = await axios.get(
        `http://localhost:5000/campgrounds/${id}`
      );
      setCamp(campground.data);
      setTitle(campground.data.title);
      setLocation(campground.data.location);
      setLoading(false);
    };
    fetchCampground();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCampground = await axios.put(
      `http://localhost:5000/campgrounds/${id}/edit`,
      { title: title, location: location }
    );
    navigate(`/campgrounds/${id}`);
  };

  return (
    <div>
      {!loading && (
        <div>
          <h1>Update your campground</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="location">location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
          <a href={`/campgrounds/${id}`}>Cancel</a>
        </div>
      )}
    </div>
  );
};

export default UpdateCampground;

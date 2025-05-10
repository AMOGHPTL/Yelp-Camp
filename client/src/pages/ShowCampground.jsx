import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchCampground = async () => {
      const campground = await axios.get(
        `http://localhost:5000/campgrounds/${id}`
      );
      setCamp(campground.data);
      setLoading(false);
    };
    fetchCampground();
  }, []);

  const handleDelete = async () => {
    const deletedCampground = await axios.delete(
      `http://localhost:5000/campgrounds/${id}/delete`
    );
    navigate("/campgrounds");
  };

  return (
    <div>
      {!loading && (
        <div>
          <h1>Campground : {camp.title}</h1>
          <h3>location : {camp.location}</h3>
        </div>
      )}
      <a href={`/campgrounds/${camp._id}/edit`}>Update</a>
      <br />
      <a href="/campgrounds">Show all</a>
      <br />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ShowCampground;

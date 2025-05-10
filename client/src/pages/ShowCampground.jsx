import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
  return (
    <div>
      {!loading && (
        <div>
          <h1>Campground : {camp.title}</h1>
          <h3>location : {camp.location}</h3>
        </div>
      )}
      <a href="/campgrounds">Show all</a>
    </div>
  );
};

export default ShowCampground;

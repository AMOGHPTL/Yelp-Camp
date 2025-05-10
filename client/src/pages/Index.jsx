import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Index = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCampgrounds = async () => {
      const campgrounds = await axios.get("http://localhost:5000/campgrounds");
      setCamps(campgrounds.data);
      setLoading(false);
    };
    fetchCampgrounds();
  }, []);

  return (
    <div>
      {!loading && (
        <div>
          <h1>All Campgrounds</h1>

          <a href="/campgrounds/new">Add Campground</a>

          {camps.map((camp, Index) => (
            <p>
              <a href={`/campgrounds/${camp._id}`}>
                {Index + 1}- {camp.title}
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;

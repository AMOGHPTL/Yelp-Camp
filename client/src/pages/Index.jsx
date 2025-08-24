import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    <div className="p-4">
      {!loading && (
        <div>
          <h1 className="text-2xl font-semibold">All Campgrounds</h1>
          {camps.map((camp, Index) => (
            <div
              className="flex gap-10 my-4 p-4 mx-4 cursor-pointer hover:scale-102 hover:bg-gray-200 transition duration-150"
              onClick={() => navigate(`/campgrounds/${camp._id}`)}
            >
              <div>
                <img src={camp.image} alt="" className="w-[300px]" />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <p className="text-xl font-semibold">{camp.title}</p>
                <p>{camp.description}</p>
                <p className="pt-10 text-gray-600">{camp.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;

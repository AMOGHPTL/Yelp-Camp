import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/campgrounds/${id}`);
        setCamp(res.data);
        setLoading(false);
      } catch (err) {
        setError("Campground not found or server error");
        navigate("/test");
      }
    };

    fetchCampground();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/campgrounds/${id}/delete`);
      navigate("/campgrounds");
    } catch (err) {
      alert("Failed to delete campground.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <div className="w-[500px] p-10">
        <div className="flex flex-col gap-2">
          <img
            src={camp.image}
            alt={camp.title}
            className="w-full rounded-md"
          />
          <h1 className="text-2xl font-semibold">{camp.title}</h1>
          <p>{camp.description}</p>
          <h3 className="text-gray-500">{camp.location}</h3>
        </div>

        <div className="flex gap-4 my-4">
          <button
            className="cursor-pointer p-2 font-semibold text-white bg-blue-600 rounded-sm"
            onClick={() => navigate(`/campgrounds/${camp._id}/edit`)}
          >
            Edit
          </button>

          <button
            className="cursor-pointer p-2 font-semibold text-white bg-red-600 rounded-sm"
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className="cursor-pointer p-2 font-semibold text-white bg-green-700 rounded-sm"
            onClick={() => navigate("/campgrounds")}
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowCampground;

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowCampground = () => {
  const [camp, setCamp] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/campgrounds/${id}/reviews`, {
        review,
        rating,
      });
      navigate(0);
    } catch (err) {
      alert("falied to add review");
    }
  };

  const handleReviewDelete = async (reviewID) => {
    try {
      await axios.delete(
        `http://localhost:5000/campgrounds/${id}/reviews/${reviewID}`
      );
      navigate(0);
    } catch (err) {
      alert("failed to delete the review");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <>
      <div className="w-full flex flex-col items-center mt-5">
        <div className="flex gap-10 p-10">
          <div>
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
          <div className="w-full flex flex-col items-start">
            <p className="text-xl font-semibold">Leave your Review</p>
            <form className="flex gap-2 flex-col w-full" action="">
              <label htmlFor="rating">Rating:</label>
              <input
                type="range"
                name="review[rating]"
                id="rating"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="body">review</label>
              <textarea
                className="border-1 w-full"
                name="review[body]"
                id="body"
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button onClick={handleSubmit} className="w-fit bg-green-400 p-2">
                Submit
              </button>
            </form>
            {camp.reviews.map((review) => (
              <div className="flex justify-between border-1 w-full p-2 my-2">
                <div>
                  <p className="text-xl font-semibold">
                    rating: {review.rating}
                  </p>
                  <p className="text-md font-semibold">
                    review: {review.review}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    handleReviewDelete(review._id);
                  }}
                  className="w-fit p-2 my-2 bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCampground;

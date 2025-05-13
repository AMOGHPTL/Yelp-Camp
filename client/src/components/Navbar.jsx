import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white flex flex-row items-center gap-5">
      <div className="text-xl font-semibold cursor-pointer">YelpCamp</div>
      <div className="cursor-pointer">Home</div>
      <div className="cursor-pointer">Campgrounds</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate("/campgrounds/new");
        }}
      >
        New Campground
      </div>
    </div>
  );
};

export default Navbar;

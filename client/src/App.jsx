import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import ShowCampground from "./pages/ShowCampground";
import NewCampground from "./pages/NewCampground";
import UpdateCampground from "./pages/UpdateCampground";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/campgrounds" element={<Index />} />
        <Route path="/campgrounds/:id" element={<ShowCampground />} />
        <Route path="/campgrounds/new" element={<NewCampground />} />
        <Route path="/campgrounds/:id/edit" element={<UpdateCampground />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
};

export default App;

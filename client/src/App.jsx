import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import ShowCampground from "./pages/ShowCampground";
import NewCampground from "./pages/NewCampground";
import UpdateCampground from "./pages/UpdateCampground";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Test from "./pages/text";
import axios from "axios";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Navbar />
      <main className="min-h-[100vh]">
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/campgrounds" element={<Index />} />
          <Route path="/campgrounds/:id" element={<ShowCampground />} />
          <Route path="/campgrounds/new" element={<NewCampground />} />
          <Route path="/campgrounds/:id/edit" element={<UpdateCampground />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

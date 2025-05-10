import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import ShowCampground from "./pages/ShowCampground";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/campgrounds" element={<Index />} />
        <Route path="/campgrounds/:id" element={<ShowCampground />} />
      </Routes>
    </div>
  );
};

export default App;

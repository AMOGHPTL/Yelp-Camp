import { Routes, Route } from "react-router-dom";
import Index from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/campgrounds" element={<Index />} />
      </Routes>
    </div>
  );
};

export default App;

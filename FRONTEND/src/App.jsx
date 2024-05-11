import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingUI from "./components/Homepage/LandingUI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingUI />} />
        <Route path="/admin" element={<LandingUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

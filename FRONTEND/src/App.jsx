import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingUI from "./components/Homepage/LandingUI";
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

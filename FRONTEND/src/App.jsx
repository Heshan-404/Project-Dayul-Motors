import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingUI from "./components/Homepage/LandingUI";
import OMPage from "./pages/OMPage/OMPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingUI />} />
        <Route path="/admin" element={<OMPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

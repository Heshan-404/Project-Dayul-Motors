import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import Home from "./pages/HomePage/Home";
import SideBar from "./components/OMPage/SideBar";
import Shop from "./pages/Shopping/Shop";
import MainPage from "./components/ShowItem/Background/MainPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<SideBar />} />
        <Route path="/Shop" element={<Shop />}>
          {/* Nested route for displaying MainItem */}
        </Route> 
          <Route path="/Shop/product/:itemId" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
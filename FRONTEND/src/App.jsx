import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import Home from "./pages/HomePage/Home";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import AdminUI from "./pages/AdminDashboard/AdminUI";
import ResponsiveDrawer from "./components/BCD";

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 100),
    profit: Math.floor(Math.random() * (70000 - 40000 + 1)) + 40000,
  }));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/test" element={<ResponsiveDrawer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

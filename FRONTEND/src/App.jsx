import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import Home from "./pages/HomePage/Home";
import Shop from "./pages/Shopping/Shop";
import MainPage from "./components/ShowItem/Background/MainPage";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import AdminUI from "./pages/AdminDashboard/AdminUI";
import LoginPage from "./pages/LoginPage/LoginPage";
import Signup from "./pages/LoginPage/SignUp";
import ForgetPassword from "./pages/LoginPage/FogetPassword";
import ChangePassword from "./pages/LoginPage/ChangePassword";
import OrderDetail from "./components/AdminDashboard/OrderMNG/OrderDetail";

function App() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []); // This should log the value of REACT_APP_API_URL

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/Shop" element={<Shop />}></Route>
        <Route path="/Shop/product/:itemId" element={<MainPage />} />
        <Route path="/admin/orderDetail/:orderID" element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

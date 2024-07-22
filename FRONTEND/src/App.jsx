import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import ProtectedRouteToHome from "./ProtectedRouteToHome";
import AdminLogin from "./components/AdminDashboard/AdminLogin";
import ProtectedRouteToAdminSignin from "./ProtectedRouteToAdminSignin";
import ResponsiveDrawer from "./pages/Test2";
import Checkout from "./pages/ShoppingCart/Checkout";
import Cart from "./pages/ShoppingCart/ShoppingCart";
import Profile from "./pages/Profile/Profile";
import OrderSuccessPage from "./pages/OrderSucces/OrderSuccess";
import NavigationBar from "./components/Homepage/NavigationBar";
import Footer from "./components/Homepage/Footer";
import axiosInstance from "./axiosConfig";
import ProtectedRouteToSignin from "./ProtectedRoutesToSignin";

function App() {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/auth/admin/settings");
      setContactNumber(response.data.contact_number || "");
      setEmail(response.data.email || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Shop/product/:productID"
          element={
            <>
              <NavigationBar phoneNo={contactNumber} />
              <MainPage />
              <Footer phoneNo={contactNumber} email={email} />
            </>
          }
        />
        <Route
          path="/Shop"
          element={
            <>
              <NavigationBar phoneNo={contactNumber} />
              <Shop />
              <Footer phoneNo={contactNumber} email={email} />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <NavigationBar phoneNo={contactNumber} />
              <Home />
              <Footer phoneNo={contactNumber} email={email} />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <NavigationBar phoneNo={contactNumber} />
              <Home />
              <Footer phoneNo={contactNumber} email={email} />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <NavigationBar phoneNo={contactNumber} />
              <AboutUs />
              <Footer phoneNo={contactNumber} email={email} />
            </>
          }
        />
        <Route element={<ProtectedRouteToHome />}>
          <Route
            path="/signin"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <LoginPage />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <Signup />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
          <Route
            path="/forget-password"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <ForgetPassword />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
          <Route
            path="/change-password"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <ChangePassword />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
        </Route>
        <Route element={<ProtectedRouteToSignin />}>
          <Route
            path="/cart"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <Cart />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <Checkout />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <NavigationBar phoneNo={contactNumber} />
                <Profile />
                <Footer phoneNo={contactNumber} email={email} />
              </>
            }
          />
        </Route>
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route element={<ProtectedRouteToAdminSignin />}>
          <Route path="/admin" element={<AdminUI />} />
        </Route>
        <Route path="/adminSign" element={<AdminLogin />} />
        <Route path="/admin/orderDetail/:orderid" element={<OrderDetail />} />
        <Route path="/test" element={<ResponsiveDrawer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

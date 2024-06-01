import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phoneIcon.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import axiosInstance from "../../axiosConfig";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();
  const [cartItemCount, setcartItemCount] = useState("0");
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axiosInstance.post(
        "/auth/user/protected/navigationbar",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("username"));
      setcartItemCount(response.data.cart);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShowSessionExpiredModal(true);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };
  const handleClick = () => {
    navigate("/signin");
    setShowSessionExpiredModal(false);
  };
  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark m-0 p-0 ps-3 pe-3"
        style={{
          backgroundColor: "rgba(0, 0, 0,1)",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <div className="container-fluid p-0 m-0">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Dayul Motors Logo" width="45" height="45" />
          </Link>
          {/* Phone Icon */}
          <a
            className="navbar-brand h5 ps-5 pt-3 d-none d-md-block"
            href="tel:+94777777777"
          >
            <img
              src={callIcon}
              alt="Phone Icon"
              width="34"
              height="34"
              className="rounded-5"
            />
            <span className="text-danger ps-3">077-777-7777</span>
          </a>
          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-lg-0 ms-sm-0 flex-column flex-lg-row">
              {/* Home */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link to="/" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">Home</span>
                </Link>
              </li>
              {/* Shop */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link to="/shop" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">Shop</span>
                </Link>
              </li>
              {/* About Us */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link to="/about-us" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">
                    About Us
                  </span>
                </Link>
              </li>
              {/* Spare Parts Dropdown */}
              <li className="nav-item dropdown ms-lg-3 my-2 my-lg-0">
                <a
                  className="nav-link dropdown-toggle fw-bold text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fs-5 font-robot hover-text-color">
                    Spare Parts
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark p-0 m-0"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link to="/chains" className="dropdown-item">
                      Chains
                    </Link>
                  </li>
                  <li>
                    <Link to="/oil" className="dropdown-item">
                      Oil
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Logged In Links */}
              {isLoggedIn && (
                <>
                  {/* Welcome Message */}
                  <li className="nav-item ms-lg-3 my-2 my-lg-0">
                    <span className="nav-link active fw-bold">
                      Welcome, {userName}
                    </span>
                  </li>
                  {/* Logout Button */}
                  <li className="nav-item ms-lg-3 my-2 my-lg-0">
                    <button
                      className="btn btn-outline-light hover-blow-effect login-btn"
                      onClick={handleLogout}
                      style={{ transform: "translateY(3px)" }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {/* Not Logged In Links */}
              {!isLoggedIn && (
                <>
                  {/* Login Button */}
                  <li className="nav-item ms-lg-3 my-2 my-lg-0">
                    <Link
                      to="/signin"
                      className="btn btn-outline-light hover-blow-effect login-btn"
                      style={{ transform: "translateY(3px)" }}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
              {/* Cart Icon */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link to="/cart" className="nav-link active fw-bold cart-icon">
                  <Badge
                    badgeContent={cartItemCount}
                    color="error"
                    overlap="circular"
                  >
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Session Expired Modal */}
      {showSessionExpiredModal && (
        <div className="modal">
          <div className="modal-content">
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setShowSessionExpiredModal(false)}
              aria-label="close"
              className="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="body1" style={{ marginTop: "30px" }}>
              Your session has expired. Please log in again.
            </Typography>
            <Button
              variant="contained"
              className="d-flex align-self-center mt-5"
              style={{ width: "fit-content" }}
              onClick={() => handleClick()}
            >
              Sign-in
            </Button>
          </div>
        </div>
      )}
      <style>
        {`
          .modal {
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px); /* Add blur effect */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            width: 300px;
            height: 200px;	
            text-align: center;
          }
          
          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          }
          
        `}
      </style>
    </>
  );
}

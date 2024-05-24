import { Link } from "react-router-dom";
import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phoneIcon.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import ShoppingCartIcon from MUI
import Badge from "@mui/material/Badge"; // Import Badge from MUI

export default function NavigationBar() {
  // Placeholder for cart items count (replace with actual logic)
  const cartItemCount = 3; // Example: 3 items in cart

  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark m-0 p-0 ps-3 pe-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          position: "absolute",
          top: "0",
          left: "0",
        }} // Slightly translucent dark background
      >
        <div className="container-fluid p-0 m-0">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Dayul Motors Logo" width="45" height="45" />
          </Link>
          {/* Responsive call button */}
          <a
            className="navbar-brand h5 ps-5 pt-3 d-none d-md-block" // Only visible on medium screens and up
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
          <div
            className="collapse navbar-collapse justify-content-end" // Align items to the right
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav mb-lg-0 ms-sm-0 flex-column flex-lg-row" // Stack nav items vertically on small screens
            >
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                {" "}
                {/* Reduced margin for better spacing */}
                <Link to="/" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">Home</span>
                </Link>
              </li>
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                {" "}
                {/* Reduced margin for better spacing */}
                <Link to="/shop" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">Shop</span>
                </Link>
              </li>
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                {" "}
                {/* Reduced margin for better spacing */}
                <Link to="/about-us" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot hover-text-color">
                    About Us
                  </span>
                </Link>
              </li>
              {/* Enhanced Spare Parts Dropdown */}
              <li className="nav-item dropdown ms-lg-3 my-2 my-lg-0">
                {" "}
                {/* Reduced margin for better spacing */}
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
                  className="dropdown-menu dropdown-menu-dark p-0 m-0" // Use dark theme for dropdown, Remove padding and margin
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
                  {/* Add more spare parts as needed */}
                </ul>
              </li>
              {/* Login Button */}
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link
                  to="/login"
                  className="btn btn-outline-light hover-blow-effect login-btn"
                  style={{ transform: "translateY(3px)" }}
                >
                  {" "}
                  {/* Translate button down by 3px */}
                  Login
                </Link>
              </li>
              {/* Shopping Cart */}
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
      <style>
        {`
          .hover-text-color:hover {
            color: red; /* Red hover text color */
          }
          .hover-blow-effect:hover {
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.5); /* Red glow on hover */
          }
          .login-btn {
            background-color: #6DFF85; /* Green background */
            color: black;           /* Black text */
          }
          .login-btn:hover {
            background-color: #45a049; /* Darker green on hover */
            color: white;            /* White text on hover */
          }
          .cart-icon:hover { /* Red hover effect for cart icon */
            color: red;
          }
        `}
      </style>
    </>
  );
}

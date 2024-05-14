import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phoneIcon.png";
import "./NavigationBarStyles.css";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark m-0 p-0 ps-3 pe-3  "
        data-aos="fade-down"
        data-aos-anchor-placement="center-center"
      >
        <div className="container-fluid p-0 m-0">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" width="45" height="45" />
          </Link>
          <a className="navbar-brand h5 ps-5 pt-3" href="tel:+94777777777">
            <img
              src={callIcon}
              alt=""
              width="34"
              height="34"
              className="rounded-5 "
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
            className="collapse navbar-collapse ms-lg-5 ms-md-5 ms-sm-0  "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  mb-lg-0 ms-sm-0 ">
              <li className="nav-item ms-lg-5">
                <Link to="/" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot">Home</span>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 ps-lg-5">
                <Link to="/shop" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot">Shop</span>
                </Link>
              </li>
              <li className="nav-item ms-lg-5 ps-lg-5">
                <Link to="/about-us" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot">About Us</span>
                </Link>
              </li>
              <li className="nav-item ms-lg-5">
                <Link to="/contact-us" className="nav-link active fw-bold">
                  <span className="fs-5 font-robot">Contact Us</span>
                </Link>
              </li>
              <li className="nav-item dropdown ms-lg-5 ps-lg-5">
                <Link
                  to="#"
                  className="nav-link active dropdown-toggle fw-bold"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fs-5 font-robot">Spare Parts</span>
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ width: "fit-content" }}
                >
                  <li>
                    <Link to="/chains" className="dropdown-item">
                      Chains
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-white" />
                  </li>
                  <li>
                    <Link to="/oil" className="dropdown-item">
                      Oil
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

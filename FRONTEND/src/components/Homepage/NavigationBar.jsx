import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phoneIcon.png";
import "./NavigationBarStyles.css";

export default function NavigationBar() {
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark m-0 p-0 ps-3 pe-3  bg-black bg-opacity-50">
        <div className="container-fluid p-0 m-0">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="45" height="45" />
          </a>
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
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="#"
                >
                  <span className="fs-5 font-robot">Home</span>
                </a>
              </li>
              <li className="nav-item ms-lg-5 ps-lg-5">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="#"
                >
                  <span className="fs-5 font-robot">Shop</span>
                </a>
              </li>
              <li className="nav-item ms-lg-5 ps-lg-5">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="#"
                >
                  <span className="fs-5 font-robot">About Us</span>
                </a>
              </li>
              <li className="nav-item ms-lg-5">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="#"
                >
                  <span className="fs-5 font-robot">Contact Us</span>
                </a>
              </li>
              <li className="nav-item dropdown ms-lg-5 ps-lg-5">
                <a
                  className="nav-link active dropdown-toggle fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fs-5 font-robot">Spare Parts</span>
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ width: "fit-content" }}
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Chains
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-white" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Oil
                    </a>
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

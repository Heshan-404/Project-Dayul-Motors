import searchIcon from "../../assets/Project Images/Dayul Motors/HomePage/searchIcon.png";
import { useState } from "react";
import "./sparePartsSearchBar.css";
export default function SparePartsSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const styles = {
    customButton: {
      color: isHovered ? "white" : "black",
      width: "200px",
      height: "30px",
      fontSize: "18px",
      fontWeight: "bolder",
      backgroundColor: "#6DFF85",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      transition: "all 0.3s ease",

      boxShadow: isHovered
        ? "0 0 10px #6DFF85, 0 0 20px #6DFF85, 0 0 20px #6DFF85 inset"
        : "0 0 5px #6DFF85",
    },
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = (isFocused) => ({
    flex: "1",
    border: "none",
    backgroundColor: "transparent",
    color: "#7D7B7B",
    borderBottom: isFocused ? "1px solid #7D7B7B" : "none",
    outline: "none", // Remove default outline
  });

  const iconStyle = {
    width: "20px",
    marginLeft: "5px",
    color: "#7D7B7B",
  };
  return (
    <>
      <h1
        className="text-center mt-4"
        data-aos="fade-up"
        style={{
          color: "white",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Shop Spare Parts by Brand & Category
      </h1>
      <div className="container" data-aos="zoom-in-up">
        <div
          className="rounded-5 m-4  ps-4 pe-4 "
          style={{ border: "1px solid #7D7B7B", backgroundColor: "#141212" }}
        >
          <div className="row">
            <div
              className="col-4 pt-3 pb-3 ps-4 "
              style={{ borderRight: "1px solid #7D7B7B" }}
            >
              <div style={searchBarStyle}>
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle(isFocused)}
                />
                <img
                  src={searchIcon}
                  className="me-2"
                  alt=""
                  style={iconStyle}
                />
              </div>
            </div>
            <div
              className="col-3 pt-3 pb-3 ps-4 "
              style={{ borderRight: "1px solid #7D7B7B" }}
            >
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle m-0 p-0 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", color: "#7D7B7B" }}
                >
                  Brands
                </button>
                <ul className="dropdown-menu p-0 m-0">
                  <li>
                    <a className="dropdown-item " href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-5 pt-3 pb-3 ps-4">
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle m-0 p-0 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", color: "#7D7B7B" }}
                >
                  Category
                </button>
                <ul className="dropdown-menu p-0 m-0">
                  <li>
                    <a className="dropdown-item " href="#">
                      Category 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      Category 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      Category 3
                    </a>
                  </li>
                </ul>
              </span>
              <button
                className="custom-btn float-end"
                style={styles.customButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

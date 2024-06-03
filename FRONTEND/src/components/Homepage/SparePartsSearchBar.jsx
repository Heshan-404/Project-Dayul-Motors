import searchIcon from "../../assets/Project Images/Dayul Motors/HomePage/searchIcon.png";
import { useState } from "react";

export default function SparePartsSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Internal Constants for Brands and Categories
  const brands = [
    { name: "Toyota" },
    { name: "Honda" },
    { name: "Ford" },
    // ... more brands
  ];

  const categories = [
    { name: "Engine Parts" },
    { name: "Brakes" },
    { name: "Suspension" },
    // ... more categories
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
    width: "100%",
  };

  const inputStyle = (isFocused) => ({
    flex: "1",
    border: "none",
    backgroundColor: "transparent",
    color: "#7D7B7B",
    borderBottom: isFocused ? "2px solid #6DFF85" : "1px solid #7D7B7B",
    outline: "none",
    padding: "8px 12px",
    fontSize: "16px",
  });

  const iconStyle = {
    width: "20px",
    marginLeft: "8px",
    color: "#7D7B7B",
    transition: "color 0.3s ease",
  };

  const customButtonStyle = {
    color: isHovered ? "white" : "black",
    minWidth: "120px",
    height: "36px",
    fontSize: "16px",
    fontWeight: "bolder",
    backgroundColor: "#6DFF85",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "0 4px 8px rgba(109, 255, 133, 0.5)"
      : "0 2px 4px rgba(0, 0, 0, 0.2)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ width: "100vw" }}>
      <h1
        className="text-center mt-4"
        data-aos="fade-up"
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "30px",
          marginBottom: "16px",
        }}
      >
        Shop Spare Parts by Brand & Category
      </h1>
      <div className="container" data-aos="zoom-in-up">
        <div
          className="rounded-5 mx-3 p-3"
          style={{
            border: "2px solid #7D7B7B",
            backgroundColor: "#141212",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-4 mb-2 mb-md-0">
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
                  style={{
                    ...iconStyle,
                    color: isFocused ? "#6DFF85" : "#7D7B7B",
                  }}
                />
              </div>
            </div>
            <div className="col-6 col-md-3 mb-2 mb-md-0">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle w-100 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", color: "#7D7B7B", fontSize: "16px" }}
                >
                  Brands
                </button>
                <ul className="dropdown-menu p-0 m-0">
                  {brands.map((brand, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#">
                        {brand.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-2 mb-md-0">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle w-100 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", color: "#7D7B7B", fontSize: "16px" }}
                >
                  Category
                </button>
                <ul className="dropdown-menu p-0 m-0">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-2 d-flex justify-content-center">
              <button
                className="custom-btn"
                style={customButtonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

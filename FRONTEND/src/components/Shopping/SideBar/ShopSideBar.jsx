/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import NavigationBar from "../../Homepage/NavigationBar";
import Footer from "../../Homepage/Footer";
import Background from "../Background/Background";
import image from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";
import all from "../../../assets/Project Images/Dayul Motors/ShopSideBar/select-all.png";
import brake from "../../../assets/Project Images/Dayul Motors/ShopSideBar/small_BrakeParts-S.jpg";
import bajaj from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import choho from "../../../assets/Project Images/Dayul Motors/Brands/Edited/NOK.jpg";
import nachi from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Nachi.jpg";
import toro from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Varroc.jpg";
import honda from "../../../assets/Project Images/Dayul Motors/Brands/Edited/small_honda.jpg";
import list from "../../../assets/Project Images/Dayul Motors/ShopSideBar/list.webp";
import search from "../../../assets/Project Images/Dayul Motors/HomePage/searchIcon.png";

// BrandImagesBar Component
const BrandImagesBar = ({ onBrandClick, selectedBrand }) => {
  const brands = [
    { name: "Bajaj", img: bajaj },
    { name: "Honda", img: choho },
    { name: "Yamaha", img: nachi },
    { name: "Suzuki", img: toro },
    { name: "NOK", img: honda },
  ];

  return (
    <div
      className="brand-images-bar d-flex justify-content-center bg-light py-2"
      style={{ marginTop: "65px" }}
    >
      <div
        className="brands-header"
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "25px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        <span
          className="fs-5 fw-semibold"
          style={{ marginRight: "55px", width: "30px", height: "30px" }}
        >
          BRANDS
        </span>
      </div>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className={`brand-image-item ${
            selectedBrand === brand.name ? "selected" : ""
          }`}
          onClick={() => onBrandClick(brand.name)}
          style={{ cursor: "pointer", margin: "0 10px" }}
        >
          <img
            src={brand.img}
            alt={brand.name}
            style={{
              width: "100px",
              height: "70px",
              border: selectedBrand === brand.name ? "2px solid blue" : "none",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  onItemClick,
  selectedItem,
  searchInput,
  onSearchChange,
  handleClearFilters, // import handleClearFilters
}) => {
  const sidebarItems = [
    { title: "All Categories", icon: all },
    { title: "Engine Parts", icon: image },
    { title: "Brake Parts", icon: brake },
    { title: "Suspension Parts", icon: image },
    { title: "Transmission Parts", icon: image },
    { title: "Electrical Parts", icon: image },
    { title: "Body Parts", icon: image },
    { title: "Exhaust Parts", icon: image },
    { title: "Fuel System Parts", icon: image },
    { title: "Cooling Parts", icon: image },
    { title: "Wheels and Tires", icon: image },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow letters and spaces
    onSearchChange(value);
  };

  const filteredItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Check if any filters are applied
  const areFiltersApplied =
    selectedItem !== "All Categories" || searchInput.trim() !== "";

  return (
    <div
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
      style={{ width: "200px", marginTop: "4px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <div
          className="brands-header"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "25px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          <img
            src={list}
            alt="List Icon"
            style={{ marginRight: "10px", width: "30px", height: "30px" }}
          />
          <span className="fs-5 fw-semibold">LIST OF CATEGORY</span>
        </div>
      </a>
      <div
        className="search-bar"
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          position: "relative",
        }}
      >
        {/* Show the clear filter button only if filters are applied */}
        {areFiltersApplied && (
          <button
            onClick={handleClearFilters}
            style={{
              marginBottom: "20px",
              width: "180px",
              height: "30px",
              borderRadius: "5px",
              border: "3px solid #ccc",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
            }}
          >
            CLEARE FILTER
          </button>
        )}
        <input
          type="text"
          placeholder="Search categories..."
          value={searchInput}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "5px 10px 5px 30px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <img
          src={search}
          alt="Search Icon"
          style={{
            position: "absolute",
            left: "20px",
            bottom: "12px",
            transform: "translateY(-50%)",
            width: "15px",
            height: "15px",
          }}
        />
      </div>
      <div className="list-group list-group-flush border-bottom scrollarea">
        {filteredItems.map((item) => (
          <a
            href="#"
            key={item.title}
            className={`list-group-item list-group-item-action py-3 lh-tight ${
              selectedItem === item.title ? "active" : ""
            }`}
            onClick={() => onItemClick(item.title)}
          >
            <img
              src={item.icon}
              alt={item.title}
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

// Content Component
const Content = ({
  selectedItem,
  selectedBrand,
  searchInput,
  onSearchChange,
}) => {
  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow letters and spaces
    onSearchChange(value);
  };

  return (
    <div>
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <input
          type="text"
          placeholder="Search items..."
          value={searchInput}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "10px 10px 10px 30px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <img
          src={search}
          alt="Search Icon"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "15px",
            height: "15px",
          }}
        />
      </div>
      <Background
        cat={selectedItem === "All Categories" ? undefined : selectedItem}
        brand={selectedBrand}
        searchInput={searchInput} // Pass search input to Background
      />
    </div>
  );
};

function ShopSideBar() {
  const [selectedItem, setSelectedItem] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [itemSearchInput, setItemSearchInput] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  // Clear Filters Function (Defined outside components)
  const handleClearFilters = () => {
    setSelectedItem("All Categories");
    setSelectedBrand(null);
    setSearchInput("");
    setItemSearchInput("");
  };

  return (
    <div>
      <NavigationBar />
      <BrandImagesBar
        onBrandClick={handleBrandClick}
        selectedBrand={selectedBrand}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
          marginLeft: "40px",
        }}
      >
        <Sidebar
          onItemClick={handleItemClick}
          selectedItem={selectedItem}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          handleClearFilters={handleClearFilters} // Pass the function to Sidebar
        />
        <div
          style={{
            padding: "20px",
            width: "calc(100% - 220px)",
            marginTop: "10px",
          }}
        >
          <Content
            selectedItem={selectedItem}
            selectedBrand={selectedBrand}
            searchInput={itemSearchInput}
            onSearchChange={setItemSearchInput}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShopSideBar;
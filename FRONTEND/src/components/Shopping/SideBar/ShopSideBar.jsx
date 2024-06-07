/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../../Homepage/NavigationBar";
import Footer from "../../Homepage/Footer";
import all from "../../../assets/Project Images/Dayul Motors/ShopSideBar/select-all.png";
import list from "../../../assets/Project Images/Dayul Motors/ShopSideBar/list.webp";
import search from "../../../assets/Project Images/Dayul Motors/HomePage/searchIcon.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircularProgress from "@mui/material/CircularProgress";
import Background from "../Background/Background";
import axiosInstance from "../../../axiosConfig";

// BrandImagesBar Component
const BrandImagesBar = ({ onBrandClick, selectedBrand }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get(`/shop/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

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
        <span className="fs-5 fw-semibold"> BRAND</span>
      </div>
      {brands.map((brand) => (
        <div
          key={brand.brandid}
          className={`brand-image-item ${
            selectedBrand === brand.brandid ? "selected" : ""
          }`}
          onClick={() => onBrandClick(brand.brandid)}
          style={{ cursor: "pointer", margin: "0 10px" }}
        >
          <img
            src={brand.imageurl}
            alt={brand.brandname}
            style={{
              width: "70px",
              height: "auto",
              border:
                selectedBrand === brand.brandid ? "2px solid blue" : "none",
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
  handleClearFilters,
  showClearButton,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/shop/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const sidebarItems = [
    { title: "All Categories", icon: all, id: undefined },
    ...categories.map((category) => ({
      title: category.categoryname,
      icon: category.imageurl,
      id: category.categoryid,
    })),
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    onSearchChange(value);
  };

  const filteredItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const areFiltersApplied =
    selectedItem !== "All Categories" || searchInput.trim() !== "";

  return (
    <div
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
      style={{ width: "207px", marginTop: "4px" }}
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
        {showClearButton && (
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
            key={item.id || item.title}
            className={`list-group-item list-group-item-action py-3 lh-tight ${
              selectedItem === item.id ? "active" : ""
            }`}
            onClick={() => onItemClick(item.id)}
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
  onLoadingComplete,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    onSearchChange(value);

    if (value !== "") {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        onLoadingComplete();
      }, 2000);
    } else {
      setIsSearching(false);
    }
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
      {/* Loading Indicator (only for search) */}
      {isSearching && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          {" "}
          <CircularProgress />
        </div>
      )}

      {/* Background (Product List) */}
      {!isSearching && (
        <Background
          cat={selectedItem}
          brand={selectedBrand}
          searchInput={searchInput}
          onLoadingComplete={onLoadingComplete}
        />
      )}
    </div>
  );
};

function ShopSideBar() {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [itemSearchInput, setItemSearchInput] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initial isLoading to true
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const contentRef = useRef(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    setShowClearButton(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBrandClick = (brandId) => {
    setSelectedBrand(brandId);
    setShowClearButton(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleClearFilters = () => {
    setSelectedItem(undefined);
    setSelectedBrand(null);
    setSearchInput("");
    setItemSearchInput("");
    setShowClearButton(false);
  };

  const handleScrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 200); // Show button after scrolling 200px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect for initial loading of categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          axiosInstance.get(`/shop/categories`),
          axiosInstance.get(`/shop/brands`),
        ]);
        setIsLoading(false); // Set isLoading to false AFTER both fetches
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      }
    };
    fetchData();
  }, []);

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
        {isLoading ? (
          // Display loading indicator before all data is fetched and rendered
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%", // Take up full width
            }}
          >
            <CircularProgress size={100} />
          </div>
        ) : (
          <React.Fragment>
            <Sidebar
              onItemClick={handleItemClick}
              selectedItem={selectedItem}
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              handleClearFilters={handleClearFilters}
              showClearButton={showClearButton}
            />
            <div
              style={{
                padding: "20px",
                width: "calc(100% - 220px)",
                marginTop: "10px",
              }}
              ref={contentRef}
            >
              <Content
                selectedItem={selectedItem}
                selectedBrand={selectedBrand}
                searchInput={itemSearchInput}
                onSearchChange={setItemSearchInput}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </React.Fragment>
        )}

        {/* Scroll to Top Button (conditionally shown) */}
        {showScrollToTop && (
          <button
            onClick={handleScrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "blue",
              color: "white",
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowUpwardIcon />
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ShopSideBar;
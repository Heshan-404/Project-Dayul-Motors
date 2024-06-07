/* eslint-disable no-unused-vars */
import Background from "../../Shopping/Background/Background";
import CustomizedBreadcrumbs from "../Breadcrimb/Breadcrumb";
import MainItem from "./MainItem";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Homepage/Footer";
import NavigationBar from "../../Homepage/NavigationBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import axiosInstance from "../../../axiosConfig";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 64px)",
  padding: "20px",
  backgroundColor: "#f2f3f8",
  marginTop: "64px",
}));

const ScrollToTopButton = styled("button")(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#007bff", // Blue background
  color: "#fff",
  borderRadius: "50%",
  padding: "10px",
  border: "none",
  cursor: "pointer",
  display: "none", // Hide initially

  // Show the button when the user scrolls down
  "&[data-visible='true']": {
    display: "block"
  }
}));

export default function MainPage() {
  const params = useParams();
  const itemId = params.productID;
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null); // State for category name
  const [categoryID, setCategoryID] = useState(null); // State for category ID
  const navigate = useNavigate();
  const location = useLocation();

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    // Show the button when the user scrolls down 100px
    const scrollToTopButton = document.querySelector('.scroll-to-top'); 
    if (scrollTop > 100) {
      scrollToTopButton.setAttribute('data-visible', 'true'); 
    } else {
      scrollToTopButton.setAttribute('data-visible', 'false');
    }
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch data when itemId changes
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true before fetching

      try {
        const response = await axiosInstance.get(`/shop/products/${itemId}`);
        setItemDetails(response.data);

        // Fetch products in the same category
        const category = response.data.categoryid;
        const categoryProductsResponse = await axiosInstance.get(
          `/shop/products/category/${category}`
        );
        setSameCategoryProducts(categoryProductsResponse.data);

        // Fetch all products
        const allProductsResponse = await axiosInstance.get(`/shop/products`);
        setAllProducts(allProductsResponse.data);

        // Fetch category name
        const categoryNameResponse = await axiosInstance.get(
          `/shop/categories/${category}`
        );
        const { categoryname } = categoryNameResponse.data[0];
        setCategoryID(category);
        setCategoryName(categoryname);

        setIsLoading(false); // Update isLoading when done
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]); // Run when itemId changes

  if (!itemDetails) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        {isLoading ? <CircularProgress /> : <div>Item not found!</div>}
      </div>
    );
  }

  const filteredSameCategoryProducts = sameCategoryProducts.filter(
    (product) => product.productid !== itemId
  );

  return (
    <div>
      <NavigationBar />
      <StyledMainContainer>
        <CustomizedBreadcrumbs cat={categoryName} catid={categoryID} />
        {/* Pass categoryName to Breadcrumb */}
        <MainItem
          id={itemId}
          brand={itemDetails.brandname}
          name={itemDetails.productname}
          price={itemDetails.price}
          desc={itemDetails.description}
          image={itemDetails.imageurl}
          quantity={itemDetails.quantity}
        />
        <div className="mt-4">
          {/* Section for same category products */}
          <h2 style={{ marginLeft: "130px" }}>
            Other Products in {categoryName}
          </h2>
          <Background
            cat={itemDetails.categoryid}
            products={filteredSameCategoryProducts}
            id={itemId}
            isLoading={isLoading} // Pass isLoading to Background
            setIsLoading={setIsLoading} // Pass setIsLoading to Background
          />

          {/* Section for all other products */}
          <h2 style={{ marginLeft: "130px" }}>All Other Products</h2>
          <Background
            products={allProducts}
            id={itemId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        {/* Add the scroll to top button */}
        <ScrollToTopButton className="scroll-to-top" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      </StyledMainContainer>
      <Footer />
    </div>
  );
}
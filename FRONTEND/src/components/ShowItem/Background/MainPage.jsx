/* eslint-disable no-unused-vars */
import Background from "../../Shopping/Background/Background";
import CustomizedBreadcrumbs from "../Breadcrimb/Breadcrumb";
import MainItem from "./MainItem";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../Homepage/Footer";
import NavigationBar from "../../Homepage/NavigationBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import axiosInstance from "../../../axiosConfig";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 64px)",
  padding: "20px",
  backgroundColor: "#f2f3f8",
  marginTop: "64px",
}));

export default function MainPage() {
  const params = useParams();
  const itemId = params.productID;
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null); // State for category name
  const [categoryID, setCategoryID] = useState(null); // State for category name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
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

        setIsLoading(false); // Update isLoading in MainPage
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [itemId]);

  if (!itemDetails) {
    return (
      <div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>Item not found!</div>
        )}
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
      </StyledMainContainer>
      <Footer />
    </div>
  );
}

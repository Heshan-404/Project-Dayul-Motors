/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ItemCard from "../ItemCard/ItemCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

export default function Background({
  cat,
  brand,
  searchInput,
  isLoading, // Receive isLoading
  setIsLoading, // Receive setIsLoading
  products,
  id,
}) {
  const [itemData, setItemData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "/products";
        if (params.catid) {
          console.log("params.catid exists:", params.catid);
          endpoint = `/products/category/${params.catid}`;
        } else if (cat && brand) {
          console.log(cat + " " + brand);
          endpoint = `/products/both/category/${cat}/brand/${brand}`;
        } else if (cat) {
          endpoint = `/products/category/${cat}`;
        } else if (brand) {
          endpoint = `/products/brand/${brand}`;
        } else if (searchInput) {
          // Handle searchInput filtering here if needed
        }

        // Fetch data based on the provided products or from the API
        if (products) {
          setItemData(products);
          setIsLoading(false); // Update loading state
        } else {
          const response = await axiosInstance.get(`/shop${endpoint}`);
          setItemData(response.data);
          setIsLoading(false); // Update loading state
        }

        setTotalPages(Math.ceil(itemData.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Update loading state
      }
    };

    fetchData();
  }, [cat, brand, searchInput, products]);

  // Filter items based on search input
  const filteredItems = itemData.filter((item) => {
    if (
      searchInput &&
      !item.productname.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Get items for the current page
  const currentItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (productId) => {
    navigate(`/Shop/product/${productId}`);
  };

  return (
    <>
      <div
        className="container"
        style={{ marginBottom: "40px", paddingLeft: "100px" }}
      >
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {currentItems.map((item, index) => {
            // Check if this item is the same as the selected item
            if (item.productid !== id) {
              return (
                <div
                  className="col"
                  key={index}
                  style={{
                    transition: "transform 0.2s ease-in-out",

                    position: "relative",
                  }}
                  ref={cardRef}
                  onClick={() => handleClick(item.productid)}
                >
                  <ItemCard
                    id={item.productid}
                    name={item.productname}
                    brand={item.brandid}
                    desc={item.description}
                    price={item.price}
                    image={item.imageurl}
                  />
                </div>
              );
            } else {
              // If the item is the same as the selected item, don't render it
              return null;
            }
          })}
        </div>
      </div>

      {/* Pagination (Conditional) */}
      {filteredItems.length > itemsPerPage && (
        <Stack spacing={2} style={{ marginTop: "20px", textAlign: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </>
  );
}

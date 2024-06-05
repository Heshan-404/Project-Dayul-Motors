/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useParams } from "react-router-dom";
import "../../../index.css";
import axiosInstance from "../../../axiosConfig";

function MainItem() {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false); // State for confirmation popup
  const [isCartAdded, setIsCartAdded] = useState(false); // State for success popup
  const { productID } = useParams();

  useEffect(() => {
    // Fetch product data using Axios
    axiosInstance
      .get(`/shop/products/${productID}`)
      .then((response) => {
        setProductData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      });
  }, [productID]);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity > productData?.quantity || newQuantity < 1) {
        return prevQuantity;
      } else {
        return newQuantity;
      }
    });
  };

  const handleAddToCart = async () => {
    // 1. Show confirmation dialog
    setIsCartPopupVisible(true);
  };

  const confirmAddToCart = async () => {
    // 2. Send data to the backend API
    try {
      const response = await axiosInstance.post(
        "/shop/cart",
        {
          productid: productID,
          quantity: quantity,
          userid: "Your_User_ID", // Replace with actual user ID
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      // 3. Show success popup if successful
      setIsCartAdded(true);
      setTimeout(() => {
        setIsCartAdded(false);
      }, 3000);

      // 4. Hide the confirmation dialog
      setIsCartPopupVisible(false);
    } catch (error) {
      console.error("Error adding cart item to database:", error);
      setIsCartPopupVisible(false); // Hide the dialog on error
    }
  };

  const cancelAddToCart = () => {
    // 5. Hide the confirmation dialog without adding to cart
    setIsCartPopupVisible(false);
  };

  if (isLoading) {
    // Show a loading indicator while data is being fetched
    return (
      <div
        className="mb-3 d-flex align-items-start"
        style={{ maxWidth: "700px", marginLeft: "130px" }}
      >
        <div style={{ width: "350px" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mb-3 d-flex align-items-start"
      style={{ maxWidth: "700px", marginLeft: "130px" }}
    >
      {/* Image */}
      <div style={{ border: "1px solid black" }}>
        <Link to={`/Shop/product/${encodeURIComponent(productID)}`}>
          <img
            src={productData.imageurl}
            className="img-fluid"
            alt="..."
            style={{ cursor: "pointer", width: "350px" }}
          />
        </Link>
      </div>

      {/* Content (right side) */}
      <div className="ml-3" style={{ margin: "10px" }}>
        {/* Item Name */}
        <div>
          <h5 className="card-title mt-3">
            {productData.productname} {/* Removed brand display */}
          </h5>
        </div>
        <div>
          <p className="card-text">{productData.description}</p>
        </div>
        {/* Price */}
        <div style={{ color: "red" }}>
          <h5 className="card-title">Rs.{productData.price}/=</h5>
        </div>

        {/* Quantity Section */}
        <div className="d-flex align-items-center mt-2 quantity-section">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 text-black quantity-value">{quantity}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= productData.quantity}
          >
            +
          </button>
          <span className="ml-5 text-black available-quantity">
            ({productData.quantity} available)
          </span>
        </div>

        <div className="mt-4 d-flex align-items-center">
          {/* Using buttons with more prominent styling */}
          <button
            className={`btn btn-lg mt-2 btn-primary custom-button`}
            style={{ width: "150px", backgroundColor: "red" }}
          >
            Buy Now
          </button>
          <button
            className={`btn btn-lg mt-2 btn-primary custom-button`}
            onClick={handleAddToCart}
            style={{
              marginLeft: "20px",
              width: "250px",
              backgroundColor: "orange",
            }}
          >
            <ShoppingCartIcon
              style={{ fontSize: "1.2em", marginRight: "5px" }}
            />
            Add to cart
          </button>
        </div>
        {/* Inline CSS within the component */}
        <style>{`
          .custom-button {
            background-color: #f0f0f0; /* Light gray background */
            border: 2px solid #ccc; /* Gray border */
            border-radius: 5px; /* Rounded corners */
            font-weight: bold; /* Bold font */
            transition: background-color 0.3s ease; /* Smooth transition for hover effect */
          }

          .custom-button:hover {
            background-color: #e0e0e0; /* Slightly darker gray on hover */
          }

          .btn-lg.btn-success {
            color: white; 
          }

          .btn-lg.btn-primary {
            color: black; 
          }

          .quantity-section { 
            border: 1px solid #ccc; 
            padding: 0px; 
            border-radius: 5px; 
          } 

          .quantity-value {
            font-size: 1.2em; 
            font-weight: bold; 
          }

          .available-quantity {
            font-style: italic;
            color: #888;
            marginLeft: 200000px;
          }
        `}</style>
      </div>

      {/* Confirmation Popup */}
      {isCartPopupVisible && (
        <div
          className="cart-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 1000, // Make sure it's on top of other elements
          }}
        >
          <h3>Add to Cart Confirmation</h3>
          <p>Are you sure you want to add this item to your cart?</p>
          <div className="mt-3">
            <button className="btn btn-primary" onClick={confirmAddToCart}>
              Confirm
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={cancelAddToCart}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isCartAdded && (
        <div
          className="cart-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 1000, // Make sure it's on top of other elements
          }}
        >
          <h3>Item Added!</h3>
          <p>The item has been added to your cart.</p>
        </div>
      )}
    </div>
  );
}

export default MainItem;

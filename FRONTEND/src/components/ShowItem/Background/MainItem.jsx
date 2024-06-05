/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../index.css";
import axiosInstance from "../../../axiosConfig";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"; // Import MUI components

function MainItem() {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false); // State for confirmation popup
  const [isCartAdded, setIsCartAdded] = useState(false); // State for success popup
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const [showStockError, setShowStockError] = useState(false); // State for stock error popup
  const [stockErrorMessage, setStockErrorMessage] = useState(null); // State for stock error message
  const { productID } = useParams();
  const navigate = useNavigate();

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
        setErrorMessage("Error fetching product data. Please try again later.");
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
    if (!localStorage.getItem("token") || !localStorage.getItem("userid")) {
      navigate("/signin");
      return;
    }
    // 2. Send data to the backend API
    try {
      const response = await axiosInstance.post(
        "/shop/cart",
        {
          productid: productID,
          quantity: quantity,
          userid: localStorage.getItem("userid"), // Replace with actual user ID
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
      setErrorMessage(null); // Clear any previous error message
      setShowStockError(false); // Clear any previous stock error
      setTimeout(() => {
        setIsCartAdded(false);
      }, 3000);

      // 4. Hide the confirmation dialog
      setIsCartPopupVisible(false);
    } catch (error) {
      console.error("Error adding cart item to database:", error);
      setIsCartPopupVisible(false); // Hide the dialog on error

      // Handle stock errors specifically
      if (error.response.status === 400 && error.response.data.message) {
        setShowStockError(true);
        setStockErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Error adding item to cart. Please try again."
        );
      }
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

      {/* Confirmation Popup (Using MUI Dialog) */}
      <Dialog
        open={isCartPopupVisible}
        onClose={() => setIsCartPopupVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add to Cart Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to add this item to your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCartPopupVisible(false)}>Cancel</Button>
          <Button onClick={confirmAddToCart} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Popup (Using MUI Dialog) */}
      <Dialog
        open={isCartAdded}
        onClose={() => setIsCartAdded(false)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">{"Item Added!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            The item has been added to your cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCartAdded(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Popup (Using MUI Dialog) */}
      <Dialog
        open={errorMessage !== null}
        onClose={() => setErrorMessage(null)}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorMessage(null)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Stock Error Popup (Using MUI Snackbar) */}
      <Snackbar
        open={showStockError}
        autoHideDuration={2000} // Auto-close after 2 seconds
        onClose={() => setShowStockError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Centered position
      >
        <Alert severity="error" sx={{ width: "400px" }}>
          {stockErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MainItem;

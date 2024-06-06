import { useState, useRef, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  CircularProgress,
  Skeleton,
} from "@mui/material";
 // Import MUI components

function MainItem() {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isCartAdding, setIsCartAdding] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(null);
  const [showStockError, setShowStockError] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState(null);
  const [isHoveredImage, setIsHoveredImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef(null);
  const sideImageRef = useRef(null);
  const { productID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
    setIsCartPopupVisible(true);
  };

  const confirmAddToCart = async () => {
    if (!localStorage.getItem("token") || !localStorage.getItem("userid")) {
      navigate("/signin");
      return;
    }
    // 2. Show loading indicator
    setIsCartAdding(true);
    try {
      const response = await axiosInstance.post(
        "/shop/cart",
        {
          productid: productID,
          quantity: quantity,
          userid: localStorage.getItem("userid"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      // 4. Hide loading indicator and show success popup
      setIsCartAdding(false);
      setIsCartAdded(true);
      setErrorMessage(null);
      setShowStockError(false);
      setTimeout(() => {
        setIsCartAdded(false);
      }, 3000);
      // 5. Hide the confirmation dialog
      setIsCartPopupVisible(false);
    } catch (error) {
      console.error("Error adding cart item to database:", error);
      setIsCartAdding(false); // Hide the loading indicator on error
      setIsCartPopupVisible(false); // Hide the dialog on error
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
    setIsCartPopupVisible(false);
  };

  const handleMouseEnterImage = () => {
    setIsHoveredImage(true);
  };

  const handleMouseLeaveImage = () => {
    setIsHoveredImage(false);
  };

  const handleMouseMove = (e) => {
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    if (sideImageRef.current && isHoveredImage) {
      const sideImageRect = sideImageRef.current.getBoundingClientRect();
      const xPercent = zoomPosition.x / mainImageRef.current.width;
      const yPercent = zoomPosition.y / mainImageRef.current.height;
      const zoomScale = 2;
      const zoomX = (sideImageRect.width * xPercent) / zoomScale;
      const zoomY = (sideImageRect.height * yPercent) / zoomScale;
      sideImageRef.current.style.transform = `translate(-${zoomX}px, -${zoomY}px) scale(${zoomScale})`;
    }
  }, [zoomPosition, isHoveredImage]);

  if (isLoading) {
    return (
      <div
        className="mb-3 d-flex align-items-start"
        style={{ maxWidth: "700px", marginLeft: "130px" }}
      >
        {/* Image Skeleton */}
        <div
          className="image-container"
          style={{ width: "350px", height: "260px" }}
        >
          <Skeleton variant="rectangular" width={350} height={260} />
        </div>

        {/* Content Skeleton */}
        <div className="ml-3" style={{ margin: "10px" }}>
          <Skeleton variant="text" width={200} height={20} />
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton
            variant="text"
            width={100}
            height={20}
            style={{ color: "red" }}
          />
          {/* Quantity Section Skeleton */}
          <div className="d-flex align-items-center mt-2 quantity-section">
            <Skeleton variant="rectangular" width={40} height={30} />
            <Skeleton variant="rectangular" width={50} height={30} />
            <Skeleton variant="rectangular" width={40} height={30} />
          </div>

          {/* Buttons Skeleton */}
          <div className="mt-4 d-flex align-items-center">
            <Skeleton variant="rectangular" width={150} height={40} />
            <Skeleton
              variant="rectangular"
              width={250}
              height={40}
              style={{ marginLeft: "20px" }}
            />
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
      <div
        className="image-container"
        onMouseEnter={handleMouseEnterImage}
        onMouseLeave={handleMouseLeaveImage}
        onMouseMove={handleMouseMove}
      >
        <Link to={`/Shop/product/${encodeURIComponent(productID)}`}>
          <img
            src={productData.imageurl}
            className="img-fluid main-image"
            alt="..."
            style={{ cursor: "zoom-in", width: "350px" }}
            ref={mainImageRef}
          />
        </Link>
        {/* Display side image on hover */}
        {isHoveredImage && (
          <div className="side-image-card">
            <img
              src={productData.imageurl}
              alt="Side image"
              className="side-image"
              ref={sideImageRef}
              style={{
                opacity: 1,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            />
          </div>
        )}
      </div>

      {/* Content (right side) */}
      <div className="ml-3" style={{ margin: "10px" }}>
        {/* Item Name */}
        <div>
          <h5 className="card-title mt-3">{productData.productname}</h5>
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
          autoHideDuration={2000}
          onClose={() => setShowStockError(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "400px" }}>
            {stockErrorMessage}
          </Alert>
        </Snackbar>
      </div>
      <style>{`
      /* styles.css */
      .image-container {
        position: relative;
        width: 350px; /* Match image width */
      }
      
      .main-image {
        border: 2px solid #ccc; /* Add border to main image */
        cursor: zoom-in; /* Change cursor to zoom-in */
      }
      
      .main-image:hover {
        cursor: pointer; /* Change cursor to pointer on hover */
      }
      
      .side-image-card {
        position: absolute;
        top: 0;
        left: 270px; /* Adjust this value to position the card correctly */
        width: 280px; /* Match the width of the main image */
        height: 260px; /* Match the height of the main image */
        border: 1px solid #ccc;
        padding: 10px;
        background-color: white;
        overflow: hidden;
      }
      
      .side-image {
        width: 100%;
        height: 100%;
        opacity: 1;
        transition: opacity 0.3s ease, transform 0.3s ease; 
        will-change: transform; /* Improves performance for transform transitions */
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
      `}</style>

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

      {/* Loading Indicator (Using MUI CircularProgress) */}
      <Dialog
        open={isCartAdding}
        onClose={() => setIsCartAdding(false)}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="loading-dialog-title"
        aria-describedby="loading-dialog-description"
      >
        <DialogTitle id="loading-dialog-title">{"Adding to Cart"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="loading-dialog-description">
            <CircularProgress />
          </DialogContentText>
        </DialogContent>
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
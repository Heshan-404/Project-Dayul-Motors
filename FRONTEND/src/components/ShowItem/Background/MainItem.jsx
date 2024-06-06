/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import "../../../index.css";

function MainItem(props) {
  const [quantity, setQuantity] = useState(1);
  const availableQuantity = props.quantity;
  const [isHoveredImage, setIsHoveredImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef(null);
  const sideImageRef = useRef(null);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity > availableQuantity) {
        return availableQuantity;
      } else if (newQuantity < 1) {
        return 1;
      } else {
        return newQuantity;
      }
    });
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

      // Calculate zoom scale based on mouse position
      const zoomScale = 2; // Fixed max zoom 2

      // Calculate translation for the zoomed area
      const zoomX = (sideImageRect.width * xPercent) / zoomScale;
      const zoomY = (sideImageRect.height * yPercent) / zoomScale;

      // Apply zoom and translation to the side image itself
      sideImageRef.current.style.transform = `translate(-${zoomX}px, -${zoomY}px) scale(${zoomScale})`;
    }
  }, [zoomPosition, isHoveredImage]);

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
        <Link to={`/Shop/product/${encodeURIComponent(props.id)}`}>
          <img
            src={props.image}
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
              src={props.image}
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
          <h5 className="card-title mt-3" style={{ fontWeight: "bold" }}>
            {props.name} {/* Card name is now bold */}
          </h5>
        </div>
        <div>
          <p className="card-text">{props.desc}</p>
        </div>
        {/* Price */}
        <div style={{ color: "red" }}>
          <h5 className="card-title">Rs.{props.price}/=</h5>
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
            disabled={quantity >= availableQuantity}
          >
            +
          </button>
          <span className="ml-5 text-black available-quantity">
            ({availableQuantity} available)
          </span>
        </div>
        <div className="mt-4 d-flex align-items-center">
          <button
            className="btn btn-lg mt-2 custom-button"
            style={{ width: "150px", backgroundColor: "red" }}
          >
            Buy Now
          </button>
          <button
            className="btn btn-lg mt-2 custom-button add-to-cart-button"
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
          }

          .image-container {
            position: relative; /* To position the side image */
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

          .side-image {
            width: 100%;
            height: 100%;
            opacity: 1;
            transition: opacity 0.3s ease, transform 0.3s ease; 
            will-change: transform; /* Improves performance for transform transitions */
          }

          .add-to-cart-button {
            border: 2px solid #ccc; /* Add border to "Add to cart" button */
          }
        `}</style>
      </div>
    </div>
  );
}

MainItem.propTypes = {
  // No longer need props because we fetch details from API
};

export default MainItem;

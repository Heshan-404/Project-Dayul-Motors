/* eslint-disable react/prop-types */
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function MainItem(props) {
  const [quantity, setQuantity] = useState(1);
  const availableQuantity = props.quantity;
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCart, setIsHoveredCart] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterCart = () => {
    setIsHoveredCart(true);
  };

  const handleMouseLeaveCart = () => {
    setIsHoveredCart(false);
  };

  return (
    <div
      className="mb-3 d-flex align-items-start"
      style={{ maxWidth: "700px", marginLeft: "130px" }}
    >
      {/* Image */}
      <div style={{ border: "1px solid black" }}>
        <Link to={`/Shop/product/${encodeURIComponent(props.id)}`}>
          <img
            src={props.image}
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
            {props.name}-{props.brand}
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
          {/* Using buttons with more prominent styling */}
          <button
            className={`btn btn-lg mt-2 ${
              isHovered ? "btn-success" : "btn-primary"
            } custom-button`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ width: "150px", backgroundColor: "red" }}
          >
            {isHovered ? "BUY NOW" : "Buy Now"}
          </button>
          <button
            className={`btn btn-lg mt-2 ${
              isHoveredCart ? "btn-success" : "btn-primary"
            } custom-button`}
            onMouseEnter={handleMouseEnterCart}
            onMouseLeave={handleMouseLeaveCart}
            style={{
              marginLeft: "20px",
              width: "250px",
              backgroundColor: "orange",
            }}
          >
            <ShoppingCartIcon
              style={{ fontSize: "1.2em", marginRight: "5px" }}
            />
            {isHoveredCart ? "ADD TO CART" : "Add to cart"}
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
    </div>
  );
}

MainItem.propTypes = {
  // No longer need props because we fetch details from API
};

export default MainItem;

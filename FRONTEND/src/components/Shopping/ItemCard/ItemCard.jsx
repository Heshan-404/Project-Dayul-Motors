/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useRef } from "react";
import { Link } from "react-router-dom";

function ItemCard(props) {
  const cardRef = useRef(null); // Create a ref for the card element

  return (
    <div
      data-aos="zoom-in"
      className="card mb-4 shadow-lg "
      style={{
        border: "1px solid black",
        width: "200px",
        height: "370px",
        margin: "1px",
        marginBottom: "1px",
        gap: "1px",
        transition: "transform 0.6s ",
        position: "relative",
      }}
      ref={cardRef} // Attach the ref to the div
      onMouseEnter={() => {
        // Scale up on mouse entercardRef.current.style.boxShadow =
        cardRef.current.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        cardRef.current.style.transform = "scale(1.05)";
        // Add shadow on mouse enter
        cardRef.current.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={() => {
        // Reset transform on mouse leave
        cardRef.current.style.transform = "scale(1)";
        // Reset box shadow on mouse leave
        cardRef.current.style.boxShadow = "none";
      }}
    >
      {/* Reduced width */}
      <Link to={`/Shop/product/${encodeURIComponent(props.id)}`} state={{}}>
        <img src={props.image} className="card-img-top img-fluid" alt="..." />
      </Link>
      <div className="card-body" style={{ backgroundColor: "black" }}>
        <h5 className="card-title" style={{ color: "white", fontSize: "14px" }}>
          {/* Reduced font size */}
          {/* Removed the Link around the name */}
          {props.name}
        </h5>
        <p className="card-text" style={{ color: "white", fontSize: "12px" }}>
          {/* Reduced font size */}
          {props.desc}
        </p>
        <div style={{ color: "red" }}>
          <h5 className="card-title ">Rs.{props.price}/=</h5>
        </div>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ItemCard;

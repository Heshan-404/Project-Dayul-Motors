import { useState } from "react";

function MainItem(props) {
  const [quantity, setQuantity] = useState(1);
  const availableQuantity = props.quantity;

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

  return (
    <div
      className="mb-3 d-flex align-items-start"
      style={{ maxWidth: "400px", marginLeft: "20px" }}
    >
      {/* Image */}
      <div style={{ border: "1px solid black" }}>
        <img
          src={props.image}
          className="img-fluid"
          alt="..."
          style={{ cursor: "pointer", width: "350px"  }}
        />
      </div>

      {/* Content (right side) */}
      <div className="ml-3" style={{ margin:"10px"  }}>
        {/* Item Name */}
        <div>
          <h5 className="card-title mt-3">{props.name}-{props.brand}</h5>
        
        </div>
        <div>
          <p className="card-text">{props.desc}</p>
        </div>
        {/* Price */}
        <div style={{ color: "red" }}>
          <h5 className="card-title">Rs.{props.price}/=</h5>
        </div>

        {/* Quantity Section */}
        <div className="d-flex align-items-center mt-2">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 text-black">{quantity}</span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= availableQuantity}
          >
            +
          </button>
          <span className="ml-5 text-black">
            ({availableQuantity} available)
          </span>
        </div>
        <div className="mt-4">
          
          <button className="btn btn-primary btn-sm mt">Buy Now</button>
          <button className="btn btn-secondary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

MainItem.propTypes = {
  // No longer need props because we fetch details from API
};

export default MainItem;

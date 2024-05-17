import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import icon from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";

function ItemCard(props) {
  return (
    <div className="card mb-3 shadow-lg" style={{ border: "1px solid black", width: "100%" }}>
      <Link
        to={`/Shop/product/${encodeURIComponent(props.id)}`} 
        state={{ 
  
        }}
      >
        <img
          src={props.image} 
          className="card-img-top img-fluid"
          alt="..."
          style={{ cursor: "pointer" }}
        />
      </Link>
      <div className="card-body" style={{ backgroundColor: "black" }}>
        <h5 className="card-title" style={{ color: "white" }}>
          <Link
            to={`/Shop/product/${encodeURIComponent(props.name)}`}
            state={{ 
              desc: props.desc, 
              price: props.price, 
              image: props.image,
            }}
            style={{ color: "white" }}
          >
            {props.name}
          </Link>
        </h5>
        <p className="card-text" style={{ color: "white", fontSize: "15px" }}>
          {props.desc}
        </p>
        <div style={{ color: "red" }}>
          <h5 className="card-title ">{props.price}</h5>
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
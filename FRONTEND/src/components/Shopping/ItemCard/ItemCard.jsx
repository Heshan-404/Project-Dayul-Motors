import icon from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import PropTypes from "prop-types";

export default function ItemCard(props) {
  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <img
        src={icon}
        className="card-img-top"
        alt="..."
        style={{ cursor: "pointer" }}
      />
      <div className="card-body" style={{ backgroundColor: "black" }}>
        <h5 className="card-title" style={{ color: "white" }}>
          {props.name}
        </h5>
        <p className="card-text" style={{ color: "white" }}>
          Set of 2 Pieces Black Color Handle Grip Pro Taper Motorcycle
        </p>
        <div style={{ color: "red" }}>
          <h5 className="card-title ">Rs.3000/=</h5>
        </div>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
};

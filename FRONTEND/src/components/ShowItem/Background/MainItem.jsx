import icon from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import PropTypes from "prop-types";

export default function MainItem(props) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={icon}
            className="card-img-top"
            alt="..."
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="col-md-8">
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
      </div>
    </div>
  );
}

MainItem.propTypes = {
  name: PropTypes.string.isRequired,
};

import newWindowIcon from "../../../assets/Project Images/Dayul Motors/HomePage/new window.png";
import CardSet from "./CardSet";
export default function BrandsSection() {
  return (
    <div style={{ width: "100vw" }} data-aos="fade-left">
      <h1
        className="text-left mt-4"
        data-aos="fade-in"
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Top Searches <br />
        By Brands
      </h1>
      <div className="row" style={{ width: "100vw" }}>
        <div className="col-6 pt-4">
          <p
            style={{
              color: "black",
              fontWeight: "normal",
              fontSize: "20px",
              paddingRight: "150px",
            }}
          >
            {`Find parts by top brands to ensure quality
for your ride.`}
          </p>
        </div>
        <div className="col-2 pt-4"></div>
        
      </div>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="4000">
            <CardSet />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <CardSet />
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <CardSet />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

import newWindowIcon from "../../../assets/Project Images/Dayul Motors/HomePage/new window.png";
import CardSet from "./CardSet";
export default function BrandsSection() {
  return (
    <div style={{ marginTop: "80px" }} className="ms-4" data-aos="fade-left">
      <h1
        className="text-left mt-4"
        data-aos="fade-in"
        style={{
          color: "white",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Top Searches <br />
        By Brands
      </h1>
      <div className="row">
        <div className="col-6 pt-4">
          <p
            style={{
              color: "white",
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
        <div className="col-4 pt-4 pe-5">
          <a
            href="/brands"
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              float: "right",
            }}
          >
            {`View All Branches`}
            <img src={newWindowIcon} className="ms-3" width={"25px"} alt="" />
          </a>
        </div>
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

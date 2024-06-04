import CardSet from "./CardSet";

const Slider = () => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ width: "100vw" }}
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;

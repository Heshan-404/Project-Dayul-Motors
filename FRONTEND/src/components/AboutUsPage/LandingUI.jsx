import NavigationBar from "../Homepage/NavigationBar";
import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import storeImage from "../../assets/Project Images/Dayul Motors/About US page/store.jpg";
import {
  FaMotorcycle,
  FaTools,
  FaAward,
  FaHandshake,
  FaWrench,
} from "react-icons/fa";

export default function LandingUI() {
  return (
    <div
      style={{
        backgroundColor: "#141414",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section (without background image) */}
      <section
        className="jumbotron jumbotron-fluid text-center pt-5 pb-5"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <div className="container">
          <div
            className="hero-content"
            style={{ padding: "2rem", borderRadius: "10px" }}
          >
            <img
              src={logo}
              width="350"
              alt="Dayul Motors Logo"
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            />
            <h1
              className="display-4 text-white font-weight-bold"
              style={{ fontFamily: "'Roboto', sans-serif" }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              About Dayul Motors
            </h1>
            <p
              className="lead text-white"
              style={{ fontSize: "1.3rem" }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Your trusted source for motorcycle parts and unparalleled service.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section (with gradient) */}
      <section
        className="py-5"
        style={{ background: "linear-gradient(to right, #1a1a1a, #222222)" }}
      >
        <div className="container">
          <div
            className="row align-items-center flex-column-reverse flex-lg-row"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div
              className="col-lg-6 mb-4 mb-lg-0 order-lg-2"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img
                src={storeImage}
                className="img-fluid rounded shadow w-100"
                alt="Dayul Motors Store"
              />
            </div>
            <div
              className="col-lg-6 order-lg-1"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h2
                className="text-white font-weight-bold mb-3"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                Our Story
              </h2>
              <p className="text-white" style={{ fontSize: "1.1rem" }}>
                Dayul Motors was founded on the principle of providing
                motorcycle enthusiasts with high-quality parts and exceptional
                customer service. With years of experience in the industry, we
                have become a trusted name in Thanamalwila and beyond. Our
                commitment to quality, reliability, and customer satisfaction
                has fueled our growth and solidified our reputation as a leader
                in the motorcycle parts market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5 bg-transparent">
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 mb-4 mb-md-0"
              data-aos="flip-left"
              data-aos-delay="100"
            >
              <div
                className="card bg-dark text-white border-light"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body text-center p-4">
                  <FaMotorcycle size="4em" className="text-danger mb-3" />
                  <h3
                    className="card-title font-weight-bold"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Our Mission
                  </h3>
                  <p className="card-text">
                    To empower motorcycle enthusiasts with a seamless and
                    reliable source for high-quality parts, fostering a
                    community of passionate riders.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="flip-right"
              data-aos-delay="200"
            >
              <div
                className="card bg-dark text-white border-light"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body text-center p-4">
                  <FaTools size="4em" className="text-danger mb-3" />
                  <h3
                    className="card-title font-weight-bold"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Our Vision
                  </h3>
                  <p className="card-text">
                    To be the leading provider of motorcycle parts, known for
                    our unwavering commitment to quality, innovation, and
                    customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container">
          <h2
            className="text-white text-center font-weight-bold mb-5"
            style={{ fontFamily: "'Roboto', sans-serif" }}
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Why Choose Dayul Motors?
          </h2>
          <div className="row">
            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div
                className="card bg-dark text-white border-light h-100"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body text-center p-4">
                  <FaAward size="3em" className="text-danger mb-3" />
                  <h5
                    className="card-title"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Wide Selection
                  </h5>
                  <p className="card-text">
                    Explore our extensive inventory of high-quality motorcycle
                    parts from trusted brands.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div
                className="card bg-dark text-white border-light h-100"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body text-center p-4">
                  <FaWrench size="3em" className="text-danger mb-3" />
                  <h5
                    className="card-title"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Quality Assurance
                  </h5>
                  <p className="card-text">
                    We are committed to providing parts that meet the highest
                    standards of quality and reliability.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div
                className="card bg-dark text-white border-light" // h-100 removed!
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body text-center p-4">
                  <FaHandshake size="3em" className="text-danger mb-3" />
                  <h5
                    className="card-title"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    Exceptional Service
                  </h5>
                  <p className="card-text">
                    Our dedicated team is here to provide you with personalized
                    support and expert advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

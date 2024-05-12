import NavigationBar from "./NavigationBar";
import bgImg from "./BackGround2.jpg";
import { useState } from "react";

export default function LandingUI() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const styles = {
    customButton: {
      color: isHovered ? "white" : "black",
      width: "200px",
      height: "40px",
      fontSize: "18px",
      fontWeight: "bolder",
      backgroundColor: "#FCD844",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      transition: "all 0.3s ease",

      boxShadow: isHovered
        ? "0 0 10px #FCD844, 0 0 20px #FCD844, 0 0 20px #FCD844 inset"
        : "0 0 5px #FCD844",
    },
    backgroundImageDiv: {
      backgroundImage: `url(${bgImg})`, // Use the imported image directly
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100vh", // Set height to 100vh for full viewport height
    },
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <div>
        <NavigationBar />
      </div>
      <div style={styles.backgroundImageDiv}>
        <div className="ms-3">
          <div
            className="row pt-md-5 pt-sm-0"
            style={{ translate: "0px 200px" }}
          >
            <div
              className="col-md-6 col-sm-12"
              style={{ translate: "50px" }}
              data-aos="fade-right"
            >
              <h1
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "60px",
                }}
              >
                QUALITY , SAFETY
                <br />
                AND PERFORMANCE
              </h1>
            </div>
            <div
              className="col-md-6 col-sm-12 float-start ps-5 pt-sm-5 pt-md-0 d-none d-sm-block"
              data-aos="fade-left"
            >
              <p
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "30px",
                }}
              >
                Welcome to <span style={{ color: "yellow" }}>Dayul Motors</span>
              </p>
              <p
                style={{
                  color: "white",
                  fontWeight: "normal",
                  fontSize: "20px",
                  paddingRight: "150px",
                }}
              >
                {` We're here to help with all your motorcycle repair and parts
                needs. Explore our products, from spare parts to accessories.
                Our easy-to-use website makes shopping a breeze. Let's make your
                next ride amazing!`}
              </p>
              <button
                className="custom-btn"
                style={styles.customButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

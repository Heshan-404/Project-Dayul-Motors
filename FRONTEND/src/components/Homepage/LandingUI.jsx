import NavigationBar from "./NavigationBar";
import bgImg from "./BackGround.jpg";

export default function LandingUI() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src={bgImg}
        className="img-fluid"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures the image covers the entire container
        }}
        alt="Responsive image"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-150%, -50%)",
          color: "white",
          fontSize: "60px",
          fontWeight: "bolder",
        }}
      >
        Your Text Here
      </div>
      <NavigationBar />
    </div>
  );
}

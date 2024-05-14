import Footer from "../../components/Homepage/Footer";
import LandingUI from "../../components/Homepage/LandingUI";

export default function Home() {
  return (
    <div className="bg-black" style={{ width: "100%" }}>
      <LandingUI />

      <div className="m-5"></div>
      <Footer />
    </div>
  );
}

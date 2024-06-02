import Footer from "../../components/Homepage/Footer";
import LandingUI from "../../components/Homepage/LandingUI";
import BrandsSection from "../../components/Homepage/BrandsSlider/BrandsSection";
import SparePartsSearchBar from "../../components/Homepage/SparePartsSearchBar";
import CategoriesSection from "../../components/Homepage/CategoriesSlider/CategoriesSection";
import NavigationBar from "../../components/Homepage/NavigationBar";

export default function Home() {
  return (
    <div className="bg-white" style={{ width: "100%" }}>
      <NavigationBar />
      <LandingUI />
      <SparePartsSearchBar />
      <div
        className="m-5"
        style={{
          backgroundColor: "black",
          height: "1px",
        }}
      ></div>
      <BrandsSection />
      <div
        className="m-5"
        style={{
          backgroundColor: "black",
          height: "1px",
        }}
      ></div>
      <CategoriesSection />
      <div className="m-5"></div>
      <Footer />
    </div>
  );
}

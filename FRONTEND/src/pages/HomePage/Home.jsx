import Footer from "../../components/Homepage/Footer";
import LandingUI from "../../components/Homepage/LandingUI";
import BrandsSection from "../../components/Homepage/BrandsSlider/BrandsSection";
import SparePartsSearchBar from "../../components/Homepage/SparePartsSearchBar";
import CategoriesSection from "../../components/Homepage/CategoriesSlider/CategoriesSection";

export default function Home() {
  return (
    <div className="bg-black" style={{ width: "100%" }}>
      <LandingUI />
      <SparePartsSearchBar />
      <BrandsSection />
      <div
        className="m-5"
        style={{
          height: "1px",
          backgroundColor: "white",
        }}
      ></div>
      <CategoriesSection />
      <div className="m-5"></div>
      <Footer />
    </div>
  );
}

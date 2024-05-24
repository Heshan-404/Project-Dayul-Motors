import { Outlet } from "react-router-dom"; // Import Outlet
import Background from "../../components/Shopping/Background/Background";
import NavigationBar from "../../components/Homepage/NavigationBar";
import ResponsiveDrawer from "../../components/Shopping/SideBar/ShopSideBar";
import Footer from "../../components/Homepage/Footer";

function Shop() {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <NavigationBar />
        </div>
        <div className="col-12">
          <ResponsiveDrawer />
          <div>
        <Footer/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;

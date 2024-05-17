import { Outlet } from "react-router-dom"; // Import Outlet
import Background from "../../components/Shopping/Background/Background";

function Shop() {
  return (
    <div>
      {/* ... Your Shop component content */}
      <Background /> {/* Render the Background component */}
      {/* ... Your Shop component content */}
      <Outlet /> 
    </div>
  );
}

export default Shop;
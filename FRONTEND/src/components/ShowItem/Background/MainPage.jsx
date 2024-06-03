/* eslint-disable no-unused-vars */
import Background from "../../Shopping/Background/Background";
import image from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import CustomizedBreadcrumbs from "../Breadcrimb/Breadcrumb";
import MainItem from "./MainItem";
import { useParams } from "react-router-dom";
import Footer from "../../Homepage/Footer";
import NavigationBar from "../../Homepage/NavigationBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledMainContainer = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 64px)", // Adjust height to avoid footer overlap
  padding: "20px", // Add padding to the container
  backgroundColor: "#f2f3f8", // Background color for the container
  marginTop: "64px", // Space for the navigation bar
}));

export default function MainPage() {
  // Example price
  const params = useParams();
  const itemId = params.itemId;
  const itemData = [
    {
      id: "1",
      name: "Bearing",
      brand: "Bajaj",
      desc: "High-quality bearings for smooth operation",
      price: 3000,
      image: image,
      availableQuantity: 15,
      category: "Electrical Parts",
    },
    {
      id: "2",
      name: "Spark Plug",
      brand: "Bajaj",
      desc: "Reliable spark plugs for optimal ignition",
      price: 1500,
      image: image,
      availableQuantity: 20,
      category: "Electrical Parts",
    },
    {
      id: "3",
      name: "Oil Filter",
      brand: "Bajaj",
      desc: "Premium oil filters for engine protection",
      price: 800,
      image: image,
      availableQuantity: 10,
      category: "Engine Parts",
    },
    {
      id: "4",
      name: "Motorcycle Helmet",
      brand: "Bajaj",
      desc: "Safe motorcycle helmet",
      price: 5000,
      image: image,
      availableQuantity: 12,
      category: "Engine Parts",
    },
    {
      id: "5",
      name: "Motorcycle Jacket",
      brand: "Bajaj",
      desc: "Protective and comfortable motorcycle jacket",
      price: 3500,
      image: image,
      availableQuantity: 15,
      category: "Engine Parts",
    },
    {
      id: "6",
      name: "Motorcycle Gloves",
      brand: "Bajaj",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Fuel System Parts",
    },
    {
      id: "7",
      name: "Motorcycle Gloves",
      brand: "NOK",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Fuel System Parts",
    },
    // Add more items as needed...
  ];
  const itemDetails = itemData.find((item) => item.id === itemId);

  if (!itemDetails) {
    return <div>Item not found!</div>;
  }

  // Log the item name
  console.log(`Item Name: ${itemDetails.name}`);
  return (
    <div>
      <NavigationBar />
      <StyledMainContainer>
        <CustomizedBreadcrumbs cat={itemDetails.category} />
        <MainItem
          brand={itemDetails.brand}
          name={itemDetails.name}
          price={itemDetails.price}
          desc={itemDetails.desc}
          image={itemDetails.image}
          quantity={itemDetails.availableQuantity}
        />
        <Background cat={itemDetails.category} id={itemDetails.id} />
        <Background />
      </StyledMainContainer>
      <Footer />
    </div>
  );
}

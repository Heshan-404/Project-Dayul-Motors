import Background from "../../Shopping/Background/Background";
import image from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import CustomizedBreadcrumbs from "../Breadcrimb/Breadcrumb";
import MainItem from "./MainItem";
import { useParams } from "react-router-dom";

export default function MainPage() {
  // Example price
  const params = useParams();
  const itemId = params.itemId;
  const itemData = [
    {
      id: "1",
      name: "Bearing",
      desc: "High-quality bearings for smooth operation",
      price: 3000,
      image: image,
      availableQuantity: 15,
      category: "ABC",
    },
    {
      id: "2",
      name: "Spark Plug",
      desc: "Reliable spark plugs for optimal ignition",
      price: 1500,
      image: image,
      availableQuantity: 20,
      category: "ABC",
    },
    {
      id: "3",
      name: "Oil Filter",
      desc: "Premium oil filters for engine protection",
      price: 800,
      image: image,
      availableQuantity: 10,
      category: "Engine Parts",
    },
    {
      id: "4",
      name: "Motorcycle Helmet",
      desc: "Stylish and safe motorcycle helmet",
      price: 5000,
      image: image,
      availableQuantity: 12,
      category: "Safety Gear",
    },
    {
      id: "5",
      name: "Motorcycle Jacket",
      desc: "Protective and comfortable motorcycle jacket",
      price: 3500,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "6",
      name: "Motorcycle Gloves",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "7",
      name: "Motorcycle Gloves",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    // Add more items as needed...
  ];
  const itemDetails = itemData.find((item) => item.id === itemId); // Use "id" property to match
  console.log(itemDetails);
  if (!itemDetails) {
    return <div>Item not found!</div>;
  }

  // Log the item name (corrected template literal)
  console.log(`Item Name: ${itemDetails.name}`);
  return (
    <div className="" style={{ backgroundColor: "#f2f3f8" }}>
      <CustomizedBreadcrumbs cat={itemDetails.category} />
      <MainItem
        name={itemDetails.name}
        price={itemDetails.price}
        desc={itemDetails.desc}
        image={itemDetails.image}
        quantity={itemDetails.availableQuantity}
      />
      <Background cat={itemDetails.category} id={itemDetails.id} />
    </div>
  );
}
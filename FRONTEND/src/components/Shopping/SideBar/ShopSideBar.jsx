/* eslint-disable react/prop-types */

import { useState } from "react";
import NavigationBar from "../../Homepage/NavigationBar";
import Footer from "../../Homepage/Footer";
import Background from "../Background/Background";
import image from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";
import all from "../../../assets/Project Images/Dayul Motors/ShopSideBar/select-all.png";
import brake from "../../../assets/Project Images/Dayul Motors/ShopSideBar/small_BrakeParts-S.jpg"; // Renamed from 'break' to 'brake'

// Sidebar Component
const Sidebar = ({ onItemClick, selectedItem }) => {
  const sidebarItems = [
    {
      title: "All Categories",
      icon: all,
    },
    {
      title: "Engine Parts",
      icon: image,
    },
    {
      title: "Brake Parts",
      icon: brake,
    },
    {
      title: "Suspension Parts",
      icon: image,
    },
    {
      title: "Transmission Parts",
      icon: image,
    },
    {
      title: "Electrical Parts",
      icon: image,
    },
    {
      title: "Body Parts",
      icon: image,
    },
    {
      title: "Exhaust Parts",
      icon: image,
    },
    {
      title: "Fuel System Parts",
      icon: image,
    },
    {
      title: "Cooling Parts",
      icon: image,
    },
    {
      title: "Wheels and Tires",
      icon: image,
    },
  ];

  return (
    <div
      className="d-flex flex-column  flex-shrink-0 bg-white "
      style={{ width: "250px", marginTop: "64px" }} // Added marginTop to move down
    >
      <a
        href="/"
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <span className="fs-5 fw-semibold">List group</span>
      </a>
      <div className="list-group list-group-flush border-bottom scrollarea">
        {sidebarItems.map((item) => (
          <a
            href="#"
            key={item.title}
            className={`list-group-item list-group-item-action py-3 lh-tight ${
              selectedItem === item.title ? "active" : ""
            }`}
            onClick={() => onItemClick(item.title)}
          >
            <img
              src={item.icon}
              alt={item.title}
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

// Content Component
const Content = ({ selectedItem }) => {
  return (
    <div>
      <Background
        cat={selectedItem === "All Categories" ? undefined : selectedItem}
      />
    </div>
  );
};

function ShopSideBar() {
  const [selectedItem, setSelectedItem] = useState("All Categories");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}
      >
        <NavigationBar />
        <Sidebar onItemClick={handleItemClick} selectedItem={selectedItem} />
        <div
          style={{
            padding: "20px",
            width: "calc(100% - 220px)",
            marginTop: "64px", // Adjusted marginTop to move down
          }}
        >
          <Content selectedItem={selectedItem} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShopSideBar;

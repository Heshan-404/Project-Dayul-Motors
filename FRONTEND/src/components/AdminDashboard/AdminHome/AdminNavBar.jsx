import React, { useState } from "react";
import Home from "../../../pages/HomePage/Home";
import Footer from "../../Homepage/Footer";

const AdminNavBar = () => {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleColumnClick = (column) => {
    setSelectedColumn(column);
  };

  const handleColumnHover = (column) => {
    setHoveredColumn(column);
  };

  const renderColumnContent = () => {
    switch (selectedColumn) {
      case 1:
        return <Home />;
      case 2:
        return <Footer />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="admin-nav-bar"
        style={{
          backgroundColor: "white",
          color: "grey", // Set text color to grey
          display: "flex",
          height: "60px", // Set navbar height
          alignItems: "center", // Align items vertically in the center
          padding: "0 20px", // Add padding to the navbar
        }}
      >
        <div
          className="column"
          onClick={() => handleColumnClick(1)}
          style={{
            flex: 1,
            color:
              selectedColumn === 1 || hoveredColumn === 1 ? "black" : "inherit", // Set text color to black if selected or hovered
            padding: "0 10px", // Add padding to each column
            cursor: "pointer", // Set cursor to pointer
          }}
          onMouseEnter={() => handleColumnHover(1)}
          onMouseLeave={() => handleColumnHover(null)}
        >
          Column 1
        </div>
        <div
          className="column"
          onClick={() => handleColumnClick(2)}
          style={{
            flex: 1,
            color:
              selectedColumn === 2 || hoveredColumn === 2 ? "black" : "inherit", // Set text color to black if selected or hovered
            padding: "0 10px", // Add padding to each column
            cursor: "pointer", // Set cursor to pointer
          }}
          onMouseEnter={() => handleColumnHover(2)}
          onMouseLeave={() => handleColumnHover(null)}
        >
          Column 2
        </div>
        <div
          className="column"
          onClick={() => handleColumnClick(3)}
          style={{ flex: 1, padding: "0 10px", cursor: "pointer" }}
          onMouseEnter={() => handleColumnHover(3)}
          onMouseLeave={() => handleColumnHover(null)}
        >
          Column 3
        </div>
        <div
          className="column"
          onClick={() => handleColumnClick(4)}
          style={{ flex: 1, padding: "0 10px", cursor: "pointer" }}
          onMouseEnter={() => handleColumnHover(4)}
          onMouseLeave={() => handleColumnHover(null)}
        >
          Column 4
        </div>
      </div>
      <div className="content">{selectedColumn && renderColumnContent()}</div>
    </div>
  );
};

export default AdminNavBar;

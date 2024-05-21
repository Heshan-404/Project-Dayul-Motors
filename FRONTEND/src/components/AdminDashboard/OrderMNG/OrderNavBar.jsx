import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AllOrders from "./AllOrder";
import ActiveOrders from "./ActiveOrders";
import PendingOrders from "./PendingOrders";
import OrderItem from "./OrderItems"; // Update paths if needed
import CanceledOrders from "./CanceledOrders";
import CompletedOrders from "./CompletedOrders";

const OrderNavBar = ({ ordersData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [orderCounts, setOrderCounts] = useState([
    { id: 1, label: "All Orders", count: 0 },
    { id: 2, label: "Active Orders", count: 0 },
    { id: 3, label: "Pending", count: 0 },
    { id: 4, label: "Cancelled", count: 0 },
    { id: 5, label: "Completed", count: 0 },
  ]);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      const counts = ordersData.reduce(
        (acc, order) => {
          // **Update this logic based on your order data structure:**
          // Example: Assuming you have an "orderStatus" field in your orders
          if (order.orderStatus === "Active Orders") {
            acc[2].count++;
          } else if (order.orderStatus === "Pending") {
            acc[3].count++;
          } // ... add more conditions for other statuses ...
          acc[1].count++;
          return acc;
        },
        [...orderCounts]
      );

      setOrderCounts(counts);
    }
  }, [ordersData]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchValue(""); // Reset search when changing tabs
  };

  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <AllOrders searchValue={searchValue} />;
      case 1:
        return <ActiveOrders searchValue={searchValue} />;
      case 2:
        return <PendingOrders searchValue={searchValue} />;
      case 3:
        return <CanceledOrders searchValue={searchValue} />;
      case 4:
        return <CompletedOrders searchValue={searchValue} />;

      default:
        return <AllOrders searchValue={searchValue} />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {orderCounts.map((column) => (
          <Tab
            key={column.id}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                {column.label}
                <Box
                  sx={{
                    marginLeft: 1,
                    width: 20,
                    height: 20,
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 0,
                    fontSize: 12,
                    border: "1px solid grey",
                  }}
                >
                  {column.count}
                </Box>
              </div>
            }
          />
        ))}
      </Tabs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <div>
          <strong>{orderCounts[selectedTab]?.label}</strong>
        </div>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)} // Update searchValue
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ p: 3 }}>{renderTabContent()}</Box>
    </Box>
  );
};

export default OrderNavBar;

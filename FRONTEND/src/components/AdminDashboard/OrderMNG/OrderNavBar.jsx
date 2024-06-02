import { useState, useEffect } from "react";
import { Tabs, Tab, Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AllOrders from "./AllOrder";
import ActiveOrders from "./ActiveOrders";
import PendingOrders from "./PendingOrders";
import CanceledOrders from "./CanceledOrders";
import CompletedOrders from "./CompletedOrders";
import axiosInstance from "../../../axiosConfig";

const OrderNavBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [ordersData, setOrdersData] = useState({});
  const [orderCounts, setOrderCounts] = useState([
    { id: 0, label: "All Orders", count: 0 },
    { id: 1, label: "Active Orders", count: 0 },
    { id: 2, label: "Pending", count: 0 },
    { id: 3, label: "Canceled", count: 0 },
    { id: 4, label: "Completed", count: 0 },
  ]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axiosInstance.get(
        "/auth/admin/protected/fetch_all_orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data.categorizedOrders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return null;
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      if (orders) {
        setOrdersData(orders);

        // Calculate counts
        const counts = [
          { id: 0, label: "All Orders", count: 0 },
          {
            id: 1,
            label: "Active Orders",
            count: orders.Active ? orders.Active.count : 0,
          },
          {
            id: 2,
            label: "Pending",
            count: orders.Pending ? orders.Pending.count : 0,
          },
          {
            id: 3,
            label: "Canceled",
            count: orders.Canceled ? orders.Canceled.count : 0,
          },
          {
            id: 4,
            label: "Completed",
            count: orders.Completed ? orders.Completed.count : 0,
          },
        ];

        // All Orders count is the sum of all counts
        counts[0].count = counts.reduce((acc, curr) => acc + curr.count, 0);

        setOrderCounts(counts);
      }
    };

    getOrders();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchValue(""); // Reset search when changing tabs
  };

  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  const renderTabContent = () => {
    const allOrders = Object.values(ordersData).flatMap(
      (status) => status.orders
    );
    switch (selectedTab) {
      case 0:
        return <AllOrders orders={allOrders} searchValue={searchValue} />;
      case 1:
        return (
          <ActiveOrders
            orders={ordersData.Active?.orders || []}
            searchValue={searchValue}
          />
        );
      case 2:
        return (
          <PendingOrders
            orders={ordersData.Pending?.orders || []}
            searchValue={searchValue}
          />
        );
      case 3:
        return (
          <CanceledOrders
            orders={ordersData.Canceled?.orders || []}
            searchValue={searchValue}
          />
        );
      case 4:
        return (
          <CompletedOrders
            orders={ordersData.Completed?.orders || []}
            searchValue={searchValue}
          />
        );
      default:
        return <AllOrders orders={allOrders} searchValue={searchValue} />;
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

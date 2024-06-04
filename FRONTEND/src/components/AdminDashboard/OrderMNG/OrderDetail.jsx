import { Button, Menu, MenuItem, useMediaQuery, useTheme, Grid, Typography, Box } from "@mui/material";
import { useState } from "react";
import OrderItems from "./OrderItems";

const OrderDetail = () => {
  const [orderStatus, setOrderStatus] = useState("Complete");
  const [selectedStatus, setSelectedStatus] = useState(orderStatus);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setAnchorEl(null); // Close the dropdown
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    setOrderStatus(selectedStatus);
    console.log("Saving order status:", selectedStatus);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {/* Header Row */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "blue",  // Blue background for header
          color: "white",  // White text for better contrast
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ margin: 0 }}>Order Details</Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Order Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: "10px" }}>
            <Typography variant="h6" component="h3" sx={{ color: "#282c34", marginBottom: "15px", marginLeft: "40px" }}>
              Order Information:
            </Typography>
            <Box component="table" sx={{ marginLeft: "40px" }}>
              <Box component="tbody">
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", width: "100px" }}>Order ID:</Box>
                  <Box component="td" sx={{ marginLeft: "20px" }}>19601</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", width: "100px" }}>Order Date:</Box>
                  <Box component="td" sx={{ marginLeft: "20px" }}>2024.05.05</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", width: "100px" }}>Order Time:</Box>
                  <Box component="td" sx={{ marginLeft: "20px" }}>14:12</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Change Status and Save Button */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRight: isMobile ? "10px" : "70px", paddingBottom: isMobile ? "10px" : "0" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: isMobile ? "column" : "row" }}>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{
                backgroundColor:
                  selectedStatus === "Canceled"
                    ? "red"
                    : selectedStatus === "Completed"
                    ? "green"
                    : "#eee",
                color: selectedStatus === "Canceled" || selectedStatus === "Completed" ? "white" : "black",
                marginBottom: isMobile ? "10px" : "0",
              }}
            >
              {selectedStatus} ▼
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                onClick={() => handleStatusChange("Completed")}
                sx={{ backgroundColor: "green", color: "white" }}
              >
                Completed
              </MenuItem>
              <MenuItem
                onClick={() => handleStatusChange("Canceled")}
                sx={{ backgroundColor: "red", color: "white" }}
              >
                Canceled
              </MenuItem>
            </Menu>
            <Button
              variant="contained"
              sx={{ marginLeft: isMobile ? "0" : "10px", marginTop: isMobile ? "10px" : "0" }}
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Grid>

        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: "15px", marginLeft: isMobile ? "0" : "40px" }}>
            <Typography variant="h6" component="h3" sx={{ color: "#282c34", marginBottom: "15px" }}>
              Customer Information:
            </Typography>
            <Box component="table">
              <Box component="tbody">
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>ID:</Box>
                  <Box component="td">#706</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Name:</Box>
                  <Box component="td">A. B. Hersh</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Email:</Box>
                  <Box component="td">hersh@example.com</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Phone:</Box>
                  <Box component="td">876-123-4567</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Address:</Box>
                  <Box component="td">1231, Main St, Anytown</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Payment Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h6" component="h3" sx={{ color: "#282c34", marginBottom: "15px", marginLeft: "100px" }}>
              Payment Information:
            </Typography>
            <Box component="table" sx={{ textAlign: "left", marginLeft: "100px" }}>
              <Box component="tbody">
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "50px" }}>Payment:</Box>
                  <Box component="td">Credit</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Status:</Box>
                  <Box component="td">{orderStatus}</Box>
                </Box>
                <Box component="tr">
                  <Box component="td" sx={{ fontWeight: "bold", marginRight: "8px" }}>Amount:</Box>
                  <Box component="td">Rs. 4,308.80</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12}>
          <Box sx={{ padding: "20px" }}>
            <OrderItems />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;

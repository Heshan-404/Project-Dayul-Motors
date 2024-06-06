/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import axiosInstance from "../../../axiosConfig"; // Assuming your Axios config is here
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const params = useParams();
  const orderid = params.orderid;

  // Fetch order details when the component mounts and after status update
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/admin/protected/order_more_detialed/${orderid}`
        );
        setOrderData(response.data);
        setOrderStatus(response.data.orderstatus);
        setSelectedStatus(response.data.orderstatus);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrder();
  }, [orderid]); // Only re-run on orderid change

  // Handle status change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value); // Get selected value from dropdown
  };

  // Handle saving the order status
  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(
        `/auth/admin/protected/order/status/${orderid}`,
        { status: selectedStatus }
      );
      console.log(response);
      if (response.status === 200) {
        // Fetch the updated order data from the server
        const updatedOrderData = await axiosInstance.get(
          `/auth/admin/protected/order_more_detialed/${orderid}`
        );

        // Update order data and status
        setOrderData(updatedOrderData.data);
        setOrderStatus(updatedOrderData.data.orderstatus);
        setSelectedStatus(updatedOrderData.data.orderstatus);
      } else {
        console.error("Failed to update order status:", response.status);
        // You can handle errors more gracefully here
        // e.g., display an error message to the user
      }
    } catch (error) {
      console.error("Error saving order status:", error);
      // Handle errors more gracefully here
    }
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
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ margin: 0 }}>
          Order Details
        </Typography>
      </Box>

      {orderData && (
        <Grid container spacing={2}>
          {/* Order Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: "10px" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  color: "#282c34",
                  marginBottom: "15px",
                  marginLeft: "40px",
                }}
              >
                Order Information:
              </Typography>
              <Box component="table" sx={{ marginLeft: "40px" }}>
                <Box component="tbody">
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", width: "100px" }}
                    >
                      Order ID:
                    </Box>
                    <Box component="td" sx={{ marginLeft: "20px" }}>
                      {orderData.orderid}
                    </Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", width: "100px" }}
                    >
                      Order Date:
                    </Box>
                    <Box component="td" sx={{ marginLeft: "20px" }}>
                      {orderData.orderdate.split("-").reverse().join(".")}
                    </Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", width: "100px" }}
                    >
                      Order Time:
                    </Box>
                    <Box component="td" sx={{ marginLeft: "20px" }}>
                      {orderData.ordertime}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* Status Dropdown and Save Button */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: isMobile ? "10px" : "70px",
              paddingBottom: isMobile ? "10px" : "0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <TextField
                select
                label="Status"
                value={selectedStatus}
                onChange={handleStatusChange}
                sx={{
                  marginBottom: isMobile ? "10px" : "0",
                  marginRight: isMobile ? "0" : "10px",
                }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem
                  value="Completed"
                  sx={{ backgroundColor: "green", color: "white" }}
                >
                  Completed
                </MenuItem>
                <MenuItem
                  value="Canceled"
                  sx={{ backgroundColor: "red", color: "white" }}
                >
                  Canceled
                </MenuItem>
              </TextField>
              <Button
                variant="contained"
                sx={{
                  marginLeft: isMobile ? "0" : "10px",
                  marginTop: isMobile ? "10px" : "0",
                }}
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
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: "#282c34", marginBottom: "15px" }}
              >
                Customer Information:
              </Typography>
              <Box component="table">
                <Box component="tbody">
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      ID:
                    </Box>
                    <Box component="td">{orderData.userid}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Name:
                    </Box>
                    <Box component="td">{orderData.customer_name}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Email:
                    </Box>
                    <Box component="td">{orderData.customer_email}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Phone:
                    </Box>
                    <Box component="td">{orderData.customer_phone}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Address:
                    </Box>
                    <Box component="td">{orderData.customer_address}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Payment Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: "20px" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  color: "#282c34",
                  marginBottom: "15px",
                  marginLeft: "100px",
                }}
              >
                Payment Information:
              </Typography>
              <Box
                component="table"
                sx={{ textAlign: "left", marginLeft: "100px" }}
              >
                <Box component="tbody">
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "50px" }}
                    >
                      Payment:
                    </Box>
                    <Box component="td">{orderData.paymentmethod}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Status:
                    </Box>
                    <Box component="td">{orderData.orderstatus}</Box>
                  </Box>
                  <Box component="tr">
                    <Box
                      component="td"
                      sx={{ fontWeight: "bold", marginRight: "8px" }}
                    >
                      Amount:
                    </Box>
                    <Box component="td">Rs. {orderData.totalamount}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Order Items */}
          <Grid item xs={12}>
            <Box sx={{ padding: "20px" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: "#282c34", marginBottom: "15px" }}
              >
                Order Items:
              </Typography>
              <Grid container spacing={2}>
                {orderData.orderItems.map((item) => (
                  <Grid item xs={12} md={4} key={item.orderitemid}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={item.productname}
                        height="140"
                        image={item.imageurl}
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {item.productname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Category: {item.categoryname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Brand: {item.brandname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: Rs. {item.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default OrderDetail;

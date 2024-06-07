import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Container,
} from "@mui/material";
import { Search, Delete, AddCircle } from "@mui/icons-material";

const Billing = () => {
  const [orderDate, setOrderDate] = useState("2024.05.05");
  const [orderTime, setOrderTime] = useState("14.12");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchItem, setSearchItem] = useState("");

  // Customer and item details fetched from the database
  const [customerId, setCustomerId] = useState("12345");
  const [customerName, setCustomerName] = useState("John Doe");
  const [customerEmail, setCustomerEmail] = useState("johndoe@example.com");
  const [customerPhone, setCustomerPhone] = useState("1234567890");
  const [customerAddress, setCustomerAddress] = useState("123 Main St, City, Country");
  const [totalAmount, setTotalAmount] = useState("Rs. 4,000.00");
  const [discount, setDiscount] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [netValue, setNetValue] = useState("Rs. 3,800.00");

  const [items, setItems] = useState([
    {
      id: 1,
      itemCode: "#123584",
      itemName: "Set of 2 Pieces Black Color Handle Grip Pro Taper Motorcycle",
      itemBrand: "Densok - OTM150",
      itemUnitprice: "Rs. 1,000.00",
      itemQuantity: 2,
      itemAmount: "Rs. 2,000.00",
    },
    {
      id: 2,
      itemCode: "#123584",
      itemName: "Set of 2 Pieces Black Color Handle Grip Pro Taper Motorcycle",
      itemBrand: "Densok - OTM150",
      itemUnitprice: "Rs. 1,000.00",
      itemQuantity: 2,
      itemAmount: "Rs. 2,000.00",
    },
  ]);

  const [mobileError, setMobileError] = useState(false);

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleDiscountChange = (e) => {
    const discountValue = e.target.value;
    if (isNaN(discountValue) || discountValue < 0) {
      setDiscountError(true);
    } else {
      setDiscountError(false);
      setDiscount(discountValue);
      // Calculate the net value based on the discount
      const netAmount = parseFloat(totalAmount.replace("Rs. ", "").replace(",", "")) - parseFloat(discountValue);
      setNetValue(`Rs. ${netAmount.toFixed(2)}`);
    }
  };

  const handleMobileChange = (e) => {
    const mobileValue = e.target.value;
    // Allow only numbers and a maximum of 10 digits
    const cleanedMobile = mobileValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (cleanedMobile.length > 10) {
      setMobileError(true);
    } else {
      setMobileError(false);
      setSearchMobile(cleanedMobile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#f0f0f0", p: 4, borderRadius: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Order Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Order Date: {orderDate}</Typography>
            <Typography variant="body1">Order Time: {orderTime}</Typography>
          </Grid>
          {/* Customer Search and Details */}
          <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
            <Box sx={{ width: "70%" }}>
              <TextField
                label="Mobile Number"
                value={searchMobile}
                onChange={handleMobileChange}
                error={mobileError}
                helperText={mobileError ? "Invalid mobile number" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                size="small"
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Customer Details:</Typography>
                <TextField
                  label="Customer ID"
                  value={customerId}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Name"
                  value={customerName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Email"
                  value={customerEmail}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Phone"
                  value={customerPhone}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Address"
                  value={customerAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Box>
            <Button variant="contained" sx={{ ml: 2 }}>
              Add New <AddCircle />
            </Button>
          </Grid>
          {/* Item Search and Table */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Enter Code or Name"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                size="small"
                sx={{ width: "35%" }} // Adjust width as needed
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No.</TableCell>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.itemCode}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.itemBrand}</TableCell>
                      <TableCell>{item.itemUnitprice}</TableCell>
                      <TableCell>{item.itemQuantity}</TableCell>
                      <TableCell>{item.itemAmount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* Summary */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Total Amount"
                    value={totalAmount}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    size="small"
                    sx={{ width: "30%", mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Add Discount"
                    value={discount}
                    onChange={handleDiscountChange}
                    error={discountError}
                    helperText={discountError ? "Invalid discount value" : ""}
                    fullWidth
                    size="small"
                    sx={{ width: "30%", mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Net Total"
                    value={netValue}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    size="small"
                    sx={{ width: "30%", mt: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* Buttons */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="error" sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                Pay Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Billing;
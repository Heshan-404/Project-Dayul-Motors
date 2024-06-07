import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import axiosInstance from "../../../axiosConfig";

export default function BillingSystem() {
  const [searchMobile, setSearchMobile] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [nextOrderID, setNextOrderID] = useState("");

  useEffect(() => {
    // Fetch all products initially
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("/local_billing/all_products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filteredProducts = allProducts.filter(
      (product) =>
        product.productid.includes(searchTerm) ||
        product.productname.includes(searchTerm)
    );
    setProductResults(filteredProducts);
  }, [searchTerm, allProducts]);

  const handleSearchCustomer = async () => {
    try {
      const response = await axiosInstance.post(
        "/local_billing/search_user_by_phone",
        {
          phone: searchMobile,
        }
      );
      if (response.data.length > 0) {
        setCustomerData(response.data[0]);
      } else {
        setShowRegisterDialog(true);
      }
    } catch (error) {
      console.error("Error searching customer:", error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      const userDetails = {
        fullname: customerName,
        email: customerEmail,
        phoneno: searchMobile,
        address: customerAddress,
        password: "defaultpassword", // You may want to generate a secure password
      };
      const response = await axiosInstance.post(
        "/local_billing/register_user",
        userDetails
      );
      setCustomerData(response.data);
      setShowRegisterDialog(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setShowAddItemDialog(true);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].itemQuantity = newQuantity;
    updateTotalAmount(updatedItems);
    setItems(updatedItems);
  };

  const handleDeleteItem = (index, itemCode) => {
    const updatedItems = items.filter((_, i) => i !== index);
    updateTotalAmount(updatedItems);
    setItems(updatedItems);
  };

  const updateTotalAmount = (updatedItems) => {
    const total = updatedItems.reduce((sum, item) => {
      const itemPrice = parseFloat(
        item.itemUnitprice.replace("Rs. ", "").replace(",", "")
      );
      return sum + itemPrice * item.itemQuantity;
    }, 0);
    setTotalAmount(total);
  };

  const handleAddItemToCart = () => {
    const newItem = {
      id: selectedProduct.productid,
      itemCode: selectedProduct.productid,
      itemName: selectedProduct.productname,
      itemUnitprice: selectedProduct.price,
      itemQuantity: quantity,
      itemAmount: selectedProduct.price * quantity,
      imageUrl: selectedProduct.imageurl,
      availableQuantity: selectedProduct.quantity,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    updateTotalAmount([...items, newItem]);
    setShowAddItemDialog(false);
  };

  const handleSubmitOrder = async () => {
    // Check if all required fields are filled
    if (!customerData) {
      alert("Please search for or register a customer first.");
      return;
    }

    if (items.length === 0) {
      alert("Please add items to the order before submitting.");
      return;
    }
    console.log("====================================");
    console.log(customerData.userid);
    console.log("====================================");
    console.log("====================================");
    console.log(items);
    console.log("====================================");

    try {
      const orderResponse = await axiosInstance.post(
        "/local_billing/create_order",
        {
          userid: customerData.userid,
          paymentmethod: "Cash", // Example payment method
          totalamount: totalAmount,
          items: items.map((item) => ({
            productid: item.itemCode,
            price: item.itemUnitprice,
            quantity: item.itemQuantity,
          })),
        }
      );

      const orderid = orderResponse.data.orderid;
      alert("Order successfully created!");
      // Reset state after successful order
      setCustomerData(null);
      setItems([]);
      setTotalAmount(0);
      setNextOrderID(""); // Reset next order ID
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  useEffect(() => {
    // Fetch next order ID
    const fetchNextOrderID = async () => {
      try {
        const response = await axiosInstance.get(
          "/local_billing/next_order_id"
        );
        setNextOrderID(response.data.nextOrderID);
      } catch (error) {
        console.error("Error fetching next order ID:", error);
      }
    };

    fetchNextOrderID();
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Billing System
      </Typography>
      <Box marginBottom={3}>
        <TextField
          label="Search Customer by Mobile"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handleSearchCustomer}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </Box>

      {customerData && (
        <Box marginBottom={3}>
          <Typography variant="h6">Customer Details</Typography>
          <Typography>Name: {customerData.fullname}</Typography>
          <Typography>Email: {customerData.email}</Typography>
          <Typography>Phone: {customerData.phoneno}</Typography>
          <Typography>Address: {customerData.address}</Typography>
        </Box>
      )}

      <Box marginBottom={3}>
        <TextField
          label="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>

      {productResults.length > 0 && (
        <Box marginBottom={3}>
          <Typography variant="h6">Search Results</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Available Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productResults.map((product) => (
                <TableRow key={product.productid}>
                  <TableCell>{product.productid}</TableCell>
                  <TableCell>{product.productname}</TableCell>
                  <TableCell>Rs. {product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAddProduct(product)}
                      variant="contained"
                      color="secondary"
                    >
                      Add to Order
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {items.length > 0 && (
        <Box marginBottom={3}>
          <Typography variant="h6">Order Items</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>Rs. {item.itemUnitprice}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.itemQuantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      inputProps={{
                        min: 1,
                        max: item.availableQuantity,
                      }}
                    />
                  </TableCell>
                  <TableCell>Rs. {item.itemAmount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteItem(index, item.itemCode)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Box marginBottom={3}>
        <Typography variant="h6">
          Total Amount: Rs. {totalAmount.toFixed(2)}
        </Typography>
      </Box>

      <Button onClick={handleSubmitOrder} variant="contained" color="primary">
        Submit Order
      </Button>

      <Dialog
        open={showRegisterDialog}
        onClose={() => setShowRegisterDialog(false)}
      >
        <DialogTitle>Customer Not Found</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This customer is not registered. Please provide their details to
            register.
          </DialogContentText>
          <TextField
            label="Full Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            fullWidth
          />
          <TextField label="Phone" value={searchMobile} fullWidth disabled />
          <TextField
            label="Address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowRegisterDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleRegisterUser} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAddItemDialog}
        onClose={() => setShowAddItemDialog(false)}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Add more details of the product here */}
            Product Code: {selectedProduct?.productid} <br />
            Product Name: {selectedProduct?.productname} <br />
            Price: Rs. {selectedProduct?.price} <br />
            Quantity:
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{
                min: 1,
                max: selectedProduct?.quantity,
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddItemDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddItemToCart} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>

      <Box marginTop={3}>
        <Typography variant="h6">Next Order ID: {nextOrderID}</Typography>
      </Box>
    </Box>
  );
}

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel as CheckboxFormControlLabel,
} from "@mui/material";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentType, setPaymentType] = useState("credit");
  const [userData, setUserData] = useState({});
  const [processing, setProcessing] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [acceptFiveDays, setAcceptFiveDays] = useState(false);
  const [acceptLocalPickup, setAcceptLocalPickup] = useState(false);

  // Assuming you are passing userId in localStorage or session storage.
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch cart items from your backend
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/checkout/cart-items`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCartItems(response.data);
          console.log(cartItems);
          // Update totalAmount when cartItems changes
          setTotalAmount(calculateTotal(response.data));
        } else {
          console.error(
            "Error fetching cart items: Empty response or invalid format."
          );
          // Handle empty response or invalid format (e.g., display a message)
          setCartItems([]); // Set cart items to an empty array if response is empty
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // Handle error (e.g., display an error message)
        alert("Error fetching cart items. Please try again later.");
      }
    };

    // Fetch user data from your backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/checkout/user-data`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data. Please try again later.");
      }
    };

    fetchCartItems();
    fetchUserData();
  }, [userId]);

  // Calculate total amount function
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const orderData = {
        userId: userId,
        paymentMethod: paymentType,
        totalAmount: totalAmount, // Use calculated totalAmount
        orderItems: cartItems.map((item) => ({
          productid: item.productid,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await axiosInstance.post("/checkout", orderData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("Order placed successfully:", response.data);

      // Redirect to success page or display a confirmation message
      navigate("/order-success", { state: { orderId: response.data.orderId } });

      setProcessing(false);
    } catch (error) {
      console.error("Error processing order:", error);
      setProcessing(false);
      alert("Error placing order. Please try again later.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/checkout/cart-items/${itemId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // Update the cartItems state
      setCartItems(cartItems.filter((item) => item.productid !== itemId));

      // Update totalAmount after deleting an item
      setTotalAmount(calculateTotal(cartItems));

      // Show alert after successful deletion
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item. Please try again later.");
    }
  };

  const handleAcceptFiveDays = (e) => {
    setAcceptFiveDays(e.target.checked);
  };

  const handleAcceptLocalPickup = (e) => {
    setAcceptLocalPickup(e.target.checked);
  };

  return (
    <div className="outer-container">
      <div className="checkout-container">
        <style>{`
          .outer-container {
            background-color: rgba(0, 0, 0, 0.1);
            padding: 20px;
            display: flex;
            justify-content: center;
          }

          .checkout-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            width: 90%;
            max-width: 1000px;
          }

          @media (min-width: 768px) {
            .checkout-container {
              flex-direction: row;
              justify-content: space-between;
            }
          }

          .continue-shopping {
            position: absolute;
            top: 10px;
            left: 10px;
            display: flex;
            align-items: center;
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            font-size: 24px;
            text-underline-offset: 5px;
            text-decoration-thickness: 2px;
            margin-bottom: 20px;
          }

          .continue-shopping:hover {
            text-decoration: underline;
          }

          .continue-shopping svg {
            margin-right: 10px;
            width: 32px;
            height: 32px;
          }

          .circle-arrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
          }

          .items-container {
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            background-color: #e7f3ff;
          }

          @media (min-width: 768px) {
            .items-container {
              width: 60%;
            }
          }

          .payment-container {
            width: 100%;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #e7f3ff;
          }

          @media (min-width: 768px) {
            .payment-container {
              width: 35%;
            }
          }

          .item {
            display: flex;
            align-items: center;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            background-color: #f0f0f0;
            color: #333;
          }

          .item + .item {
            margin-top: 10px;
          }

          .item-image {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }

          .item-details {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
          }

          .item-details p {
            margin: 0 10px;
          }

          .total-amount {
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            text-align: right;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          form div {
            margin-bottom: 10px;
          }

          label {
            display: block;
            margin-bottom: 5px;
          }

          input[type="text"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .payment-options {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
          }

          .payment-options input[type="radio"] {
            margin-right: 5px;
          }

          .expiration-cvv {
            display: flex;
            justify-content: space-between;
          }

          .expiration-cvv div {
            width: 48%;
          }

          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }

          h2 {
            color: #007bff;
            margin-top: 20px;
            text-align: center;
          }

          .delete-button {
            background-color: #dc3545; 
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px; 
          }

          .delete-button:hover {
            background-color: #c82333;
          }
        `}</style>

        <Link to="/" className="continue-shopping">
          <div className="circle-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Continue Shopping
        </Link>

        <div className="items-container">
          <h2>Order Summary</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="item" key={item.productid}>
                <img
                  src={item.imageurl}
                  alt={item.productname}
                  className="item-image"
                />
                <div className="item-details">
                  <p>{item.productname}</p>
                  <p>Price: Rs.{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: Rs.{item.price * item.quantity}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.productid)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="total-amount">Total: Rs.{totalAmount}</div>
        </div>

        <div className="payment-container">
          <h2>Payment Details</h2>
          <p>
            Please select your payment type and enter your payment details
            below:
          </p>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentType"
                value="credit"
                checked={paymentType === "credit"}
                onChange={handlePaymentTypeChange}
              />
              Credit
            </label>
            <label>
              <input
                type="radio"
                name="paymentType"
                value="cash"
                checked={paymentType === "cash"}
                onChange={handlePaymentTypeChange}
              />
              Cash
            </label>
          </div>
          {paymentType === "credit" && (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" required />
              </div>
              <div className="expiration-cvv">
                <div>
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv" required />
                </div>
              </div>
              <div>
                <label htmlFor="cardName">Name on Card:</label>
                <input type="text" id="cardName" name="cardName" required />
              </div>
              <button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Checkout"}
              </button>
            </form>
          )}
          {paymentType === "cash" && (
            <div>
              <FormGroup>
                <CheckboxFormControlLabel
                  control={
                    <Checkbox
                      checked={acceptFiveDays}
                      onChange={handleAcceptFiveDays}
                      name="acceptFiveDays"
                      color="primary"
                    />
                  }
                  label="I accept that my order is valid for only five days."
                />
                <CheckboxFormControlLabel
                  control={
                    <Checkbox
                      checked={acceptLocalPickup}
                      onChange={handleAcceptLocalPickup}
                      name="acceptLocalPickup"
                      color="primary"
                    />
                  }
                  label="I understand that I need to visit locally to collect my order items."
                />
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!(acceptFiveDays && acceptLocalPickup)} // Enable if both are checked
              >
                {processing ? "Processing..." : "Checkout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invoice from "./Invoice"; // Import Invoice component
import NavigationBar from "../../components/Homepage/NavigationBar";
import axiosInstance from "../../axiosConfig";

const Checkout = () => {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(); // Ref for the Invoice component

  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [paymentType, setPaymentType] = useState("cash");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [checkoutDisabled, setCheckoutDisabled] = useState(true);
  const [acceptCashTerms, setAcceptCashTerms] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/checkout/cart-items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/checkout/user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCartItems();
    fetchUserData();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    setCheckoutDisabled(e.target.value === "credit" ? true : false);
    setAcceptCashTerms(false);
  };

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        userId: userData.userid,
        paymentMethod: paymentType,
        totalAmount: calculateTotal(),
        orderItems: cartItems.map((item) => ({
          productid: item.productid,
          price: item.price,
          quantity: item.quantity,
        })),
      };
      downloadInvoice();
      console.log(orderData);
      const response = await axiosInstance.post("/checkout", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Order placed successfully:", response.data);
      setCartItems([]);
      setShowInvoice(true); // Show the Invoice after order placement
      localStorage.setItem("orderSuccess", true);
      navigate("/order-success");
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  const downloadInvoice = async () => {
    const invoiceElement = invoiceRef.current; // Get the Invoice component element
    if (!invoiceElement) {
      console.error("Error: Invoice element not found.");
      return;
    }

    try {
      const canvas = await html2canvas(invoiceElement);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating invoice PDF:", error);
    }
  };

  const handleAcceptCashTerms = (e) => {
    setAcceptCashTerms(e.target.checked);
    setCheckoutDisabled(!e.target.checked);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/checkout/cart-items/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter((item) => item.productid !== productId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <Card key={item.productid} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography>Price: Rs.{item.price}</Typography>
          <Typography>Quantity: {item.quantity}</Typography>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleRemoveFromCart(item.productid)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    ));
  };

  const renderPaymentFields = () => {
    if (paymentType === "credit") {
      return (
        <>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailsChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Expiry Date"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handlePaymentDetailsChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handlePaymentDetailsChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Name on Card"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={handlePaymentDetailsChange}
            fullWidth
            required
            margin="normal"
          />
        </>
      );
    } else if (paymentType === "cash") {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptCashTerms}
              onChange={handleAcceptCashTerms}
            />
          }
          label="I accept the terms and conditions for cash on delivery."
        />
      );
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="checkout-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>
        {renderCartItems()}
        <Typography variant="h6" gutterBottom>
          Total Amount: Rs.{calculateTotal()}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <RadioGroup
            name="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
          >
            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          </RadioGroup>
          {renderPaymentFields()}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={checkoutDisabled}
          >
            Place Order
          </Button>
        </form>

        {showInvoice && (
          <div id="invoice-container">
            <Invoice
              ref={invoiceRef}
              cartItems={cartItems}
              userData={userData}
              totalAmount={calculateTotal()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;

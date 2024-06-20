/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import successIcon from "../../assets/Project Images/OrderSuccess/preview.gif"; // Import the GIF file

const OrderSuccessPage = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to the home page after 5 seconds (5000 milliseconds)

      window.location.href = "/";
    }, 5000); // Change this value to set the timeout duration in milliseconds

    // Clean up the timeout to prevent memory leaks
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={styles.container}>
      <img src={successIcon} alt="successIcon" style={styles.icon} />{" "}
      {/* Add the icon */}
      <h1 style={styles.heading}>Order Successful!</h1>
      <h2 style={styles.paragraph}>
        Thank you for your order. Your order has been successfully placed.
      </h2>
      <h2 style={styles.paragraph} className="pt-4">
        We have sent you an email about the order.
      </h2>
      <Link to="/shop" style={styles.button}>
        Back to Shop
      </Link>{" "}
      {/* Add the back to shop button */}
      {/* You can add additional content here, such as order details or a confirmation number */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    height: "100vh",
    width: "100%",
    // Use a light color background to contrast with the GIF
    backgroundColor: "#003241",
  },
  icon: {
    width: "500px", // Adjust the size of the icon as needed
    height: "auto",
    // Center the icon
  },
  heading: {
    color: "#4CAF50",
  },
  paragraph: {
    fontSize: "18px",
    color: "white",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",

    border: "2px solid #4CAF50", // Add border
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s", // Add transition effect
  },
};

export default OrderSuccessPage;

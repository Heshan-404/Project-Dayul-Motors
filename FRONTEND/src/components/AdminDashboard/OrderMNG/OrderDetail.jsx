/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderItems from "./OrderItems";
import axiosInstance from "../../../axiosConfig";
import { Button } from "@mui/material";

const OrderDetail = () => {
  const { orderid } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/admin/protected/order/${orderid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        setOrderDetails(response.data);
        setOrderStatus(response.data.orderstatus);
        setSelectedStatus(response.data.orderstatus);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderid]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    toggleDropdown(); // Close the dropdown after selecting a status
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/orders/update-status/${orderid}`, {
        status: selectedStatus,
      });
      setOrderStatus(selectedStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div
        style={{ gridRow: "1", gridColumn: "1 / span 2", textAlign: "center" }}
      >
        <h2 style={{ color: "#282c34" }}>Order Details</h2>
      </div>

      <div
        style={{
          gridRow: "2",
          gridColumn: "1",
          textAlign: "left",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#282c34", marginBottom: "15px" }}>
          Customer Info:
        </h3>
        <table style={{ textAlign: "left", marginLeft: "100px" }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Name:</td>
              <td>{orderDetails.customer_name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Email:</td>
              <td>{orderDetails.customer_email}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Phone:</td>
              <td>{orderDetails.customer_phone}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Address:
              </td>
              <td>{orderDetails.customer_address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          gridRow: "2",
          gridColumn: "2",
          textAlign: "left",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#282c34", marginBottom: "15px" }}>Order Info:</h3>
        <table style={{ textAlign: "left", marginLeft: "100px" }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Order Date:
              </td>
              <td>{new Date(orderDetails.orderdate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Order Time:
              </td>
              <td>{orderDetails.ordertime}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Payment:
              </td>
              <td>{orderDetails.paymentmethod}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Status:
              </td>
              <td>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    style={{
                      padding: "8px 12px",
                      border: "2px solid black",
                      borderRadius: "4px",
                      fontSize: "16px",
                      cursor: "pointer",
                      color: "black",
                      backgroundColor:
                        selectedStatus === "Canceled"
                          ? "red"
                          : selectedStatus === "Completed"
                          ? "green"
                          : "#eee",
                    }}
                    onClick={toggleDropdown}
                  >
                    {selectedStatus}
                    <span
                      style={{ marginLeft: "5px" }}
                      className="dropdown-arrow"
                    >
                      ▼
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "",
                        boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                        zIndex: "1",
                        right: "0",
                      }}
                    >
                      <button
                        style={{
                          display: "block",
                          padding: "8px 12px",
                          textAlign: "left",
                          width: "100%",
                          border: "none",
                          backgroundColor: "green",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => handleStatusChange("Completed")}
                      >
                        Completed
                      </button>
                      <button
                        style={{
                          display: "block",
                          padding: "8px 12px",
                          textAlign: "left",
                          width: "100%",
                          border: "none",
                          backgroundColor: "red",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => handleStatusChange("Canceled")}
                      >
                        Canceled
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Amount:
              </td>
              <td>{orderDetails.totalamount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{ gridRow: "3", gridColumn: "1 / span 2", textAlign: "center" }}
      >
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>

      <OrderItems />
    </div>
  );
};

export default OrderDetail;

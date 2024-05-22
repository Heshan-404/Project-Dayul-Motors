import { Button } from "@mui/material";
import React, { useState } from "react";
import OrderItems from "./OrderItems";

const OrderDetail = () => {
  const [orderStatus, setOrderStatus] = useState("Complete");
  const [selectedStatus, setSelectedStatus] = useState(orderStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSave = () => {
    setOrderStatus(selectedStatus);
    console.log("Saving order status:", selectedStatus);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto 1fr",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          gridColumn: "span 2",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#282c34", marginBottom: "15px" }}>
          Order Details
        </h2>
      </div>

      {/* Order Info */}
      <div
        style={{
          gridRow: "2",
          gridColumn: "1",
          padding: "10px",
        }}
      >
        <div
          style={{
            lineHeight: "1.2",
          }}
        >
          <div
            style={{
              display: "flex",

              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto auto 1fr",
                gap: "20px",
                padding: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {/* ... (other parts of your component) */}

              {/* Order Info */}
              <div
                style={{
                  gridRow: "2",
                  gridColumn: "1",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    lineHeight: "1.4",
                  }}
                >
                  <h3 style={{ color: "#282c34", marginBottom: "15px" }}>
                    Order Info:
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontWeight: "bold",
                            marginRight: "8px",
                            width: "100px",
                          }}
                        >
                          Order ID:
                        </td>
                        <td style={{ marginLeft: "20px" }}>19601</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontWeight: "bold",
                            marginRight: "8px",
                            width: "100px",
                          }}
                        >
                          Order Date:
                        </td>
                        <td style={{ marginLeft: "20px" }}>2024.05.05</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontWeight: "bold",
                            marginRight: "8px",
                            width: "100px",
                          }}
                        >
                          Order Time:
                        </td>
                        <td style={{ marginLeft: "20px" }}>14:12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Status and Save Button */}
      <div
        style={{
          gridRow: "2",
          gridColumn: "2",
          textAlign: "right",
          padding: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
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
              <span style={{ marginLeft: "5px" }} className="dropdown-arrow">
                ▼
              </span>
            </button>
            {!isDropdownOpen && (
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
          <Button
            variant="contained"
            sx={{ marginLeft: "10px" }}
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Customer Info */}
      <div
        style={{
          gridRow: "3",
          gridColumn: "1",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#282c34", marginBottom: "15px" }}>Customer:</h3>
        <table>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>ID:</td>
              <td>#706</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Name:</td>
              <td>A. B. Hersh</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Email:</td>
              <td>hersh@example.com</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>Phone:</td>
              <td>876-123-4567</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Address:
              </td>
              <td>1231, Main St, Anytown</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Details */}
      <div
        style={{
          gridRow: "3",
          gridColumn: "2",
          textAlign: "left",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#282c34", marginBottom: "15px" }}>Order Info:</h3>
        <table style={{ textAlign: "left", marginLeft: "100px" }}>
          {/* Order Info Table: Right Alignment */}
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "50px" }}>
                Payment:
              </td>
              <td>Credit</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Status:
              </td>
              <td>{orderStatus}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", marginRight: "8px" }}>
                Amount:
              </td>
              <td>Rs. 4,308.80</td>
            </tr>
          </tbody>
        </table>
      </div>
      <OrderItems/>
    </div>

  );
};

export default OrderDetail;

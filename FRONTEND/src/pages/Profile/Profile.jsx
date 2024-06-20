/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [editFullName, setEditFullName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editMobileNumber, setEditMobileNumber] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const userResponse = await axiosInstance.get(
          `/auth/user/users/${localStorage.getItem("userid")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(userResponse.data);
        setFullName(userResponse.data.fullname);
        setEmail(userResponse.data.email);
        setMobileNumber(userResponse.data.phoneno);
        setAddress(userResponse.data.address);

        const orderResponse = await axiosInstance.get(
          `/auth/user/orders/${localStorage.getItem("userid")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedOrders = orderResponse.data.sort(
          (a, b) =>
            parseInt(b.orderid.replace("ORD_", "")) -
            parseInt(a.orderid.replace("ORD_", ""))
        );
        const formattedOrders = sortedOrders.map((order) => ({
          ...order,
          orderdate: new Date(order.orderdate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          ordertime: new Date(order.orderdate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        }));
        setOrdersData(formattedOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobileNumber":
        setMobileNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const toggleEdit = (field) => {
    switch (field) {
      case "fullName":
        setEditFullName(!editFullName);
        break;
      case "email":
        setEditEmail(!editEmail);
        break;
      case "mobileNumber":
        setEditMobileNumber(!editMobileNumber);
        break;
      case "address":
        setEditAddress(!editAddress);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(
        `/auth/user/users/${localStorage.getItem("userid")}`,
        {
          fullname: fullName,
          email: email,
          phoneno: mobileNumber,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData({
        ...userData,
        fullname: fullName,
        email: email,
        phoneno: mobileNumber,
        address: address,
      });
      setEditFullName(false);
      setEditEmail(false);
      setEditMobileNumber(false);
      setEditAddress(false);
      // Refresh page
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOrder = async (orderid) => {
    setDeletingOrderId(orderid);
    setIsDeleting(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(
        `/auth/user/orders/${orderid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrdersData(ordersData.filter((order) => order.orderid !== orderid));
      // Refresh page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setIsDeleting(false);
      setDeletingOrderId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/signin");
  };

  return (
    <div className="profile-container">
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress size={80} />
        </div>
      )}
      <style>{`
        .profile-container {
          display: flex;
          flex-direction: column;
          width: 100vw; 
          padding: 20px; 
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin:0px;
          margin-top: 40px; /* Added margin to move container down */
        }

        .profile-section { 
          flex: 1; /* Allow profile section to take up available space */
        }

        .form-group {
          margin-bottom: 15px;
          position: relative;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        input[type="text"],
        input[type="email"],
        input[type="tel"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          color: #333;
        }

        .edit-icon {
          position: absolute;
          top: 5px;
          right: 10px;
          cursor: pointer;
          font-size: 18px;
          color: #333;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .log-out-button {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        th, td {
          text-align: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
          color: #333;
        }

        th {
          background-color: #f2f2f2;
          font-weight: bold;
          color: #333;
        }

        h2 {
          color: #333;
        }

        .save-button, .delete-button {
          position: relative;
        }

        .save-button .loader, .delete-button .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none; 
        }

        .save-button.loading .loader, .delete-button.loading .loader {
          display: block; 
        }

        .save-button .loader {
          color: white; 
        }

        .save-button {
          background-color: #007bff; /* Primary Blue */
        }

        .delete-button {
          background-color: transparent;
          color: #dc3545; /* Red icon color */
          padding: 0; 
        }

        .delete-button:hover {
          background-color: #dc3545; /* Red background on hover */
          color: white; /* White icon color */
        }

        .delete-button svg {
          color: inherit; /* Inherit color from parent */
        }

        /* Loader Overlay */
        .loader-overlay {
          position: fixed; 
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5); 
          z-index: 100; 
        }

        /* Responsive Styling for Smaller Screens */
        @media (max-width: 768px) { 
          .profile-container {
            flex-direction: column; 
          }

          .profile-section {
            width: 100%;
          }

          .orders-section {
            width: 100%;
            margin-top: 20px; 
          }

          .log-out-button {
            position: relative;
            top: 0;
            right: 0;
          }
 

          table {
            font-size: 12px; /* Reduce font size for better mobile display */
          }

          .profile-section {
            padding: 10px; font-size: 12px;     }

          .form-group {
            margin-bottom: 10px;
          }

          .delete-button {
            margin-bottom: 5px; 
            /* Move delete button down for better visibility */
          }
        }

        /* Responsive Styling for Tablet Screens (Optional) */
        @media (max-width: 1024px) {
          .profile-section {
            width: 50%;
          }

          .orders-section {
            width: 50%;
          }
        }

        /* Responsive Styling for Large Screens */
        @media (min-width: 768px) {
          .profile-container {
            flex-direction: row; /* Back to row layout */
          }

          .profile-section {
            width: 40%;
          }

          .orders-section {
            width: 60%;
            margin-left: 20px; 
          }
 
        }
      `}</style>

      <Grid container spacing={2} className="profile-container">
        <Grid item xs={12} md={4} className="profile-section">
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            style={{ margin: "20px", marginLeft: "0px" }}
          >
            Log Out
          </Button>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <form onSubmit={handleSubmit} className="profile-form">
            {" "}
            {/* Add profile-form class */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              {editFullName ? (
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  aria-label="Full Name"
                />
              ) : (
                <span>{fullName}</span>
              )}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() => toggleEdit("fullName")}
                aria-hidden="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              {editEmail ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  aria-label="Email Address"
                />
              ) : (
                <span>{email}</span>
              )}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() => toggleEdit("email")}
                aria-hidden="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              {editMobileNumber ? (
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  aria-label="Mobile Number"
                />
              ) : (
                <span>{mobileNumber}</span>
              )}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() => toggleEdit("mobileNumber")}
                aria-hidden="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              {editAddress ? (
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  aria-label="Address"
                />
              ) : (
                <span>{address}</span>
              )}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() => toggleEdit("address")}
                aria-hidden="true"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={`save-button ${isSaving ? "loading" : ""}`}
              disabled={isSaving}
            >
              {isSaving ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={8} className="orders-section">
          <Typography variant="h5" gutterBottom>
            My Orders
          </Typography>
          <table>
            <thead>
              <tr>
                <th scope="col">ORDER ID</th>
                <th scope="col">ORDER DATE</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">STATUS</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.orderid}>
                  <td>{order.orderid}</td>
                  <td>{order.orderdate}</td>
                  <td>{order.totalamount}</td>
                  <td>{order.orderstatus}</td>
                  <td>
                    {order.orderstatus === "Pending" && (
                      <IconButton
                        className={`delete-button ${
                          deletingOrderId === order.orderid ? "loading" : ""
                        }`}
                        size="small"
                        onClick={() => handleDeleteOrder(order.orderid)}
                        disabled={
                          isDeleting || deletingOrderId === order.orderid
                        }
                      >
                        {deletingOrderId === order.orderid ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;

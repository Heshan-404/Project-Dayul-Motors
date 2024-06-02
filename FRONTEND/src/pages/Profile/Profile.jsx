import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [editFullName, setEditFullName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editMobileNumber, setEditMobileNumber] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

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
      case "password":
        setPassword(value);
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
      case "password":
        setEditPassword(!editPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated profile data to backend using fetch or AJAX
    console.log("Updated profile data:", {
      fullName,
      email,
      mobileNumber,
      address,
      password,
    });
    // Clear form fields after submission (optional)
    setFullName("");
    setEmail("");
    setMobileNumber("");
    setAddress("");
    setPassword("");
  };

  const ordersData = [
    {
      id: 1001,
      date: "2024.02.10",
      amount: "Rs. 1300.00",
      status: "Completed",
    },
    { id: 1301, date: "2024.03.17", amount: "Rs. 13400.00", status: "Pending" },
    { id: 1501, date: "2024.04.12", amount: "Rs. 2500.00", status: "Shipped" },
  ];

  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added a subtle box shadow */
          position: relative; 
        }

        .profile-section,
        .orders-section {
          width: 45%;
          padding: 20px;
        }

        .form-group {
          margin-bottom: 15px;
          position: relative; /* Added to position edit icon within form group */
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333; /* Darker gray for better contrast */
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="tel"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          color: #333; /* Darker gray for better contrast */
        }

        .edit-icon {
          position: absolute; /* Position edit icon relative to form-group */
          top: 5px;
          right: 10px;
          cursor: pointer;
          font-size: 18px;
          color: #333; /* Darker gray for better contrast */
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
          border-radius: 8px; /* Rounded corners for table */
          overflow: hidden;  /* Hide any overflow to keep the rounded corners */
        }

        th, td {
          text-align: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
          color: #333; /* Darker gray for better contrast */
        }

        th {
          background-color: #f2f2f2;
          font-weight: bold;
          color: #333; /* Darker gray for better contrast */
        }

        h2 {
          color: #333; /* Darker gray for better contrast */
        }
      `}</style>
      <div className="profile-section">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit}>
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
              />
            ) : (
              <span>{fullName || "Enter your full name"}</span>
            )}
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => toggleEdit("fullName")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
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
              />
            ) : (
              <span>{mobileNumber || "Enter your mobile number"}</span>
            )}
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => toggleEdit("mobileNumber")}
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
              />
            ) : (
              <span>{address || "Enter your address"}</span>
            )}
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => toggleEdit("address")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            
           
          </div>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </form>
      </div>
      <div className="orders-section">
        <h2>My Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>ORDER DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <IconButton
                      color="error"
                      className="delete-button"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="contained" color="error" className="log-out-button">
        Log Out
      </Button>
    </div>
  );
}

export default Profile;

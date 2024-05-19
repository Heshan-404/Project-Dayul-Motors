/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Snow icon
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

// Separate component for Confirmation Dialog
const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="warning" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Separate component for Snackbar Alert
const SnackbarAlert = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MuiAlert onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default function UserDataTable(props) {
  const [dataSet, setDataSet] = useState([
    {
      userID: "001",
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      phoneNumber: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      status: "active",
    },
    {
      userID: "002",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securepassword",
      phoneNumber: "987-654-3210",
      address: "456 Oak Ave, Springfield, USA",
      status: "active",
    },
    {
      userID: "003",
      fullName: "David Wilson",
      email: "david.wilson@example.com",
      password: "mypassword",
      phoneNumber: "555-123-4567",
      address: "789 Pine St, Cityville, USA",
      status: "active",
    },
    {
      userID: "004",
      fullName: "Sarah Jones",
      email: "sarah.jones@example.com",
      password: "pass1234",
      phoneNumber: "222-333-4444",
      address: "101 Elm St, Townsville, USA",
      status: "freeze",
    },
    {
      userID: "005",
      fullName: "Michael Brown",
      email: "michael.brown@example.com",
      password: "verysecure",
      phoneNumber: "888-999-0000",
      address: "202 Maple St, Villagetown, USA",
      status: "active",
    },
    {
      userID: "006",
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      password: "password5",
      phoneNumber: "777-888-1111",
      address: "303 Birch St, Hamletville, USA",
      status: "freeze",
    },
    {
      userID: "007",
      fullName: "James Miller",
      email: "james.miller@example.com",
      password: "password7",
      phoneNumber: "444-555-6666",
      address: "404 Cedar St, Countryshire, USA",
      status: "active",
    },
  ]);

  const [openFreezeDialog, setOpenFreezeDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editingRow, setEditingRow] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenFreezeDialog(true);
  };

  const handleCloseFreezeDialog = () => {
    setOpenFreezeDialog(false);
    setEditingRow(null);
  };

  const handleDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedDataSet = dataSet.filter(
        (row) => row.userID !== selectedUserId
      );
      setDataSet(updatedDataSet);
      showSnackbar("User deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFreeze = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Freezing user with ID: ${selectedUserId}`);
      const updatedDataSet = dataSet.map((row) => {
        if (row.userID === selectedUserId) {
          return { ...row, status: "freeze" };
        }
        return row;
      });
      setDataSet(updatedDataSet);
      setOpenFreezeDialog(false);
      showSnackbar("User frozen successfully!", "success");
    } catch (error) {
      console.error("Error freezing user:", error);
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving changes:", editingRow);
      const updatedDataSet = dataSet.map((row) => {
        if (row.userID === editingRow.userID) {
          return editingRow;
        }
        return row;
      });
      setDataSet(updatedDataSet);
      setEditingRow(null);
      showSnackbar("Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // Filter data based on search term
  const filteredDataSet = dataSet.filter((row) => {
    if (props.searchTerm === "") {
      return true;
    } else {
      return (
        row.userID.includes(props.searchTerm) ||
        row.email.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.fullName.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.phoneNumber.includes(props.searchTerm) ||
        row.address.toLowerCase().includes(props.searchTerm.toLowerCase())
      );
    }
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <div className="table-container">
      <style>
        {`
          /* Styles for responsive table */
          .table-container {
            overflow-x: auto;
            width: 100%;
          }

          .table {
            width: 100%;
            table-layout: auto; /* Let columns adjust to content width */
          }

          /* Optional: Prevent text wrapping for smaller screens */
          @media (max-width: 768px) {
            .table th, 
            .table td {
              white-space: nowrap;
              font-size: 14px; /* Reduce font size for smaller screens */
            }
          }
        `}
      </style>
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>User ID</TableCell>
              <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>Email</TableCell>
              <TableCell style={{ textAlign: "center" }}>Password</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Phone Number
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Address</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDataSet.map((row) => (
              <TableRow
                key={row.userID}
                sx={{ "&:last-child td, &:last-child th": { borderTop: 1 } }}
              >
                {/* Render row data normally if not editing */}
                {editingRow?.userID !== row.userID ? (
                  <>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "center" }}
                    >
                      {row.userID}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.fullName}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.email}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.password}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {row.address}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        color: row.status === "active" ? "green" : "red",
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <div className="d-flex">
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ marginRight: "10px" }}
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<AcUnitIcon />}
                          onClick={() => handleClickOpen(row.userID)}
                        >
                          Freeze
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  // Render editable fields if editing
                  <>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "center" }}
                    >
                      {row.userID}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <TextField
                        fullWidth
                        defaultValue={row.fullName}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <TextField
                        fullWidth
                        defaultValue={row.email}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            email: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <TextField
                        fullWidth
                        defaultValue={row.password}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            password: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <TextField
                        fullWidth
                        defaultValue={row.phoneNumber}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <TextField
                        fullWidth
                        defaultValue={row.address}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            address: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {editingRow.status}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "10px", width: "90px" }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setEditingRow(null)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Freeze Confirmation Dialog  */}
      <ConfirmDialog
        open={openFreezeDialog}
        onClose={handleCloseFreezeDialog}
        onConfirm={handleFreeze}
        title="Confirm Freeze"
        message="Are you sure you want to freeze this user?"
      />

      {/* Snackbar Alert */}
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

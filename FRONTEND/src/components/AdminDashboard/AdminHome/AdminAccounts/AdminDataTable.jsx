/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Snow icon
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axiosInstance from "../../../../axiosConfig";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

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
  const [dataSet, setDataSet] = useState([]);
  const [openFreezeDialog, setOpenFreezeDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedadminid, setSelectedadminid] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [adminLevel, setAdminLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/details",
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setDataSet(response.data.adminDetails);
      setAdminLevel(localStorage.getItem("adminLevel"));
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showSnackbar("Failed to fetch admin data.", "error");
      setIsLoading(false); // Set loading to false even on error
    }
  };

  const handleClickOpen = (adminid) => {
    setSelectedadminid(adminid);
    setOpenFreezeDialog(true);
  };

  const handleCloseFreezeDialog = () => {
    setOpenFreezeDialog(false);
    setEditingRow(null);
  };

  const handleFreeze = async () => {
    try {
      const response = await axiosInstance.put(
        `/auth/admin/protected/admin_freeze/${selectedadminid}`,
        { status: "freeze" },
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data);
      setDataSet((prevDataSet) =>
        prevDataSet.map((row) =>
          row.adminid === selectedadminid ? { ...row, status: "freeze" } : row
        )
      );
      setOpenFreezeDialog(false);
      showSnackbar("User frozen successfully!", "success");
    } catch (error) {
      console.error("Error freezing user:", error);
      showSnackbar("Failed to freeze user.", "error");
    }
  };

  const handleUnfreeze = async () => {
    try {
      const response = await axiosInstance.put(
        `/auth/admin/protected/admin_unfreeze/${selectedadminid}`,
        { status: "active" },
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data);
      setDataSet((prevDataSet) =>
        prevDataSet.map((row) =>
          row.adminid === selectedadminid ? { ...row, status: "active" } : row
        )
      );
      setOpenFreezeDialog(false);
      showSnackbar("User unfrozen successfully!", "success");
    } catch (error) {
      console.error("Error unfreezing user:", error);
      showSnackbar("Failed to unfreeze user.", "error");
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(
        `/auth/admin/protected/admin_update/${editingRow.adminid}`,
        {
          fullname: editingRow.fullname,
          email: editingRow.email,
          phoneno: editingRow.phoneno,
          level: editingRow.level,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setDataSet((prevDataSet) =>
        prevDataSet.map((row) =>
          row.adminid === editingRow.adminid ? editingRow : row
        )
      );
      setEditingRow(null);
      fetchUserData();
      showSnackbar("Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving changes:", error);
      showSnackbar("Failed to save changes.", "error");
    }
  };

  const handleDelete = async (adminid) => {
    try {
      const response = await axiosInstance.delete(
        `/auth/admin/protected/admin_delete/${adminid}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data);
      setDataSet((prevDataSet) =>
        prevDataSet.filter((row) => row.adminid !== adminid)
      );
      showSnackbar("Admin deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting admin:", error);
      showSnackbar("Failed to delete admin.", "error");
    }
  };

  const filteredDataSet = dataSet.filter((row) => {
    if (props.searchTerm === "") {
      return true;
    } else {
      return (
        row.adminid.includes(props.searchTerm) ||
        row.email.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.fullname.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.phoneno.includes(props.searchTerm) ||
        row.level.toLowerCase().includes(props.searchTerm.toLowerCase())
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
    <div className="table-container mt-3">
      <style>
        {`  
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

      {/* Show loading animation if isLoading is true */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {/* Show table data if isLoading is false */}
      {!isLoading && (
        <TableContainer style={{ width: "100%" }} component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center", width: "200px" }}>
                  Admin ID
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
                <TableCell style={{ textAlign: "center", width: "100px" }}>
                  Email
                </TableCell>

                <TableCell style={{ textAlign: "center" }}>
                  Phone Number
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Level</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                {adminLevel == 3 && (
                  <TableCell style={{ textAlign: "center", width: "240px" }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataSet.map((row) => (
                <TableRow
                  key={row.adminid}
                  sx={{ "&:last-child td, &:last-child th": { borderTop: 1 } }}
                >
                  {/* Render row data normally if not editing */}
                  {editingRow?.adminid !== row.adminid ? (
                    <>
                      {console.log(row)}
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        {row.adminid}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.fullname}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.email}
                      </TableCell>

                      <TableCell style={{ textAlign: "center" }}>
                        {row.phoneno}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.level}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          color: row.status === "active" ? "green" : "red",
                        }}
                      >
                        {row.status}
                      </TableCell>
                      {adminLevel == 3 && (
                        <TableCell style={{ textAlign: "center" }}>
                          <div className="d-flex">
                            <Button
                              variant="contained"
                              color="warning"
                              sx={{ marginRight: "10px", width: "100%" }}
                              startIcon={<EditIcon />}
                              onClick={() => handleEdit(row)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ width: "100%" }}
                              startIcon={<AcUnitIcon />}
                              onClick={() => handleClickOpen(row.adminid)}
                            >
                              Freeze
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ width: "100%" }}
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(row.adminid)} // Add onClick for delete
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </>
                  ) : (
                    // Render editable fields if editing
                    <>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        {row.adminid}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <TextField
                          fullWidth
                          defaultValue={row.fullname}
                          onChange={(e) =>
                            setEditingRow({
                              ...editingRow,
                              fullname: e.target.value,
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
                          defaultValue={row.phoneno}
                          onChange={(e) =>
                            setEditingRow({
                              ...editingRow,
                              phoneno: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <TextField
                          fullWidth
                          defaultValue={row.level}
                          onChange={(e) =>
                            setEditingRow({
                              ...editingRow,
                              level: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {editingRow.status}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div className="d-flex">
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginRight: "10px", width: "100%" }}
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ width: "100%" }}
                            onClick={() => setEditingRow(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Freeze/Unfreeze Confirmation Dialog  */}
      <ConfirmDialog
        open={openFreezeDialog}
        onClose={handleCloseFreezeDialog}
        onConfirm={
          selectedadminid && selectedadminid.status === "active"
            ? handleFreeze
            : handleUnfreeze
        }
        title={`Are you sure you want to ${
          selectedadminid && selectedadminid.status === "active"
            ? "freeze"
            : "unfreeze"
        } this admin?`}
        message={`Admin ID: ${selectedadminid}`}
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

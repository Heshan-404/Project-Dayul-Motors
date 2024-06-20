/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ConfirmDialog from "./ConfirmDialog";
import SnackbarAlert from "./SnackbarAlert";
import axiosInstance from "../../../../axiosConfig";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

export default function UserDataTable(props) {
  const [dataSet, setDataSet] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [dialogAction, setDialogAction] = useState(""); // 'activate' or 'freeze'
  const [editingRow, setEditingRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/fetch_all_users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setDataSet(response.data.users);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching user data:", error);
      showSnackbar("Failed to fetch user data.", "error");
      setIsLoading(false); // Set loading to false even on error
    }
  };

  const handleClickOpen = (userId, action) => {
    setSelectedUserId(userId);
    setDialogAction(action);
    setOpenConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setEditingRow(null);
  };

  // Handle the Activate/Freeze confirmation
  const handleConfirm = async () => {
    try {
      const status = dialogAction === "activate" ? "active" : "freeze";
      const result = await axiosInstance.put(
        `/auth/admin/protected/user_freeze_unfreeze/${selectedUserId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setDataSet((prevDataSet) =>
        prevDataSet.map((row) =>
          row.userid === selectedUserId ? { ...row, status } : row
        )
      );

      setOpenConfirmDialog(false);
      showSnackbar(
        `User ${
          dialogAction === "activate" ? "activated" : "frozen"
        } successfully!`,
        "success"
      );
    } catch (error) {
      console.error(
        `Error ${
          dialogAction === "activate" ? "activating" : "freezing"
        } user:`,
        error
      );
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = async () => {
    console.log(editingRow);
    try {
      const response = await axiosInstance.put(
        `/auth/admin/protected/user_update/${editingRow.userid}`,
        {
          fullname: editingRow.fullname,
          email: editingRow.email,
          phoneno: editingRow.phoneno,
          address: editingRow.address,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Update the local state with the new data
      setDataSet((prevDataSet) =>
        prevDataSet.map((row) =>
          row.userid === editingRow.userid ? editingRow : row
        )
      );
      // Exit editing mode
      setEditingRow(null);
      // Refresh the data from the backend
      fetchUserData();
      // Show a success message to the user
      showSnackbar("Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving changes:", error);
      showSnackbar("Failed to save changes.", "error");
    }
  };

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
  const filteredDataSet = dataSet.filter((row) => {
    if (props.searchTerm === "") {
      return true;
    } else {
      return (
        row.userid.includes(props.searchTerm) ||
        row.email.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.fullname.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        row.phoneno.includes(props.searchTerm) ||
        row.address.toLowerCase().includes(props.searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div className="table-container">
      {/* Display loading indicator if isLoading is true */}
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

      {/* Show the table if isLoading is false */}
      {!isLoading && (
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center", width: "200px" }}>
                  User ID
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
                <TableCell style={{ textAlign: "center", width: "100px" }}>
                  Email
                </TableCell>

                <TableCell style={{ textAlign: "center" }}>
                  Phone Number
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Address</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>

                <TableCell style={{ textAlign: "center", width: "240px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataSet.map((row) => (
                <TableRow
                  key={row.userid}
                  sx={{ "&:last-child td, &:last-child th": { borderTop: 1 } }}
                >
                  {/* Render row data normally if not editing */}
                  {editingRow?.userid !== row.userid ? (
                    <>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        {row.userid}
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
                            sx={{ marginRight: "10px", width: "100%" }}
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                          {row.status === "active" ? (
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ width: "100%" }}
                              startIcon={<AcUnitIcon />}
                              onClick={() =>
                                handleClickOpen(row.userid, "freeze")
                              }
                            >
                              Freeze
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              sx={{ width: "100%" }}
                              startIcon={<AcUnitIcon />}
                              onClick={() =>
                                handleClickOpen(row.userid, "activate")
                              }
                            >
                              Unfreeze
                            </Button>
                          )}
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
                        {row.userid}
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

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        title={`Confirm ${
          dialogAction === "activate" ? "Activation" : "Freeze"
        }`}
        message={`Are you sure you want to ${
          dialogAction === "activate" ? "Activate" : "Freeze"
        } this user?`}
      />
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

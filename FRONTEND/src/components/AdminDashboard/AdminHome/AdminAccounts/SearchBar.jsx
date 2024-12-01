import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminDataTable from "./AdminDataTable";
import AdminRegister from "./AdminRegister";
import axiosInstance from "../../../../axiosConfig";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRootAdmins, setShowRootAdmins] = useState(false);
  const [rootAdmins, setRootAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null); // For delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const adminLevel = 3;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegistering(false);
  };

  const handleDelete = async () => {
    if (selectedAdminId === null) return;
    try {
      const response = await axiosInstance.delete(
        `/auth/admin/protected/admin_delete/${selectedAdminId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data);
      setRootAdmins((prevRootAdmins) =>
        prevRootAdmins.filter((admin) => admin.adminid !== selectedAdminId)
      );
      setShowDeleteConfirmation(false);
      // Implement showSnackbar function or remove it if not needed
      // showSnackbar("Admin deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting admin:", error);
      // Implement showSnackbar function or remove it if not needed
      // showSnackbar("Failed to delete admin.", "error");
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAdminClick = () => {
    setIsRegistering(true);
  };

  const handleRegisterComplete = () => {
    setIsRegistering(false);
    fetchRootAdmins(); // Fetch root admins again after registration
  };

  const fetchRootAdmins = async () => {
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/rootadmins"
      );
      setRootAdmins(response.data);
    } catch (error) {
      console.error("Error fetching root admins:", error);
    }
  };

  useEffect(() => {
    fetchRootAdmins();
  }, []);

  return (
    <div className="col-12">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email or ID"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {adminLevel >= 3 && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddAdminClick}
                sx={{ margin: "10px", width: { xs: "100%", md: "auto" } }}
              >
                Add Admin
              </Button>
              <Button
                variant="contained"
                color="info"
                sx={{ margin: "10px", width: { xs: "100%", md: "auto" } }}
                onClick={() => setShowRootAdmins(true)}
              >
                Show Root Admins
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          {isRegistering ? (
            <AdminRegister onRegister={handleRegisterComplete} />
          ) : (
            <div className="admin-data-table-container">
              <AdminDataTable searchTerm={searchTerm} rootAdmins={rootAdmins} adminLevel={adminLevel} />
            </div>
          )}
        </Grid>

        <Dialog
          open={showRootAdmins}
          onClose={() => setShowRootAdmins(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Root Admins</DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Admin ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rootAdmins.map((admin) => (
                  <TableRow key={admin.adminid}>
                    <TableCell>{admin.adminid}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.fullname}</TableCell>
                    <TableCell>{admin.phoneno}</TableCell>
                    {adminLevel === 4 && (
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{ width: "100%", marginLeft: "10px" }}
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setSelectedAdminId(admin.adminid);
                            setShowDeleteConfirmation(true);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowRootAdmins(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this admin?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <style>
        {`
          /* For screens larger than 768px (e.g., tablets and desktops) */
          @media (min-width: 768px) {
            .admin-data-table-container {
              width: 100%; /* Take up the full width of the screen */
            }
          }

          /* For screens smaller than 768px (e.g., mobile) */
          @media (max-width: 768px) {
            .admin-data-table-container {
              width: 100%; /* Set the width to 200px */
            }
          }
        `}
      </style>
    </div>
  );
}

export default SearchBar;

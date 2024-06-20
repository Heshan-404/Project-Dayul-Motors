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
import AdminDataTable from "./AdminDataTable";
import AdminRegister from "./AdminRegister";
import axiosInstance from "../../../../axiosConfig";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRootAdmins, setShowRootAdmins] = useState(false);
  const [rootAdmins, setRootAdmins] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegistering(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAdminClick = () => {
    setIsRegistering(true);
  };

  const handleRegisterComplete = () => {
    setIsRegistering(false);
  };

  const fetchRootAdmins = async () => {
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/rootadmins",
        {}
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
      <Grid container spacing={2} sx={{}}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit} style={{}}>
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
            sx={{ margin: "10px", width: { xs: "100%", md: "auto" } }}
          >
            Search
          </Button>
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
        </Grid>
        <Grid item xs={12}>
          {isRegistering ? (
            <AdminRegister onRegister={handleRegisterComplete} />
          ) : (
            <div className="admin-data-table-container">
              <AdminDataTable searchTerm={searchTerm} rootAdmins={rootAdmins} />
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
      </Grid>
      <style>
        {`
          /* For screens smaller than 768px (e.g., mobile) */
@media (min-width: 768px) {
  .admin-data-table-container {
    width: 100%; /* Take up the full width of the screen */
  }
}

/* For screens larger than or equal to 768px (e.g., tablets and desktops) */
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

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
      ); // Make API request
      setRootAdmins(response.data); // Set the root admins state
    } catch (error) {
      console.error("Error fetching root admins:", error);
    }
  };

  useEffect(() => {
    fetchRootAdmins(); // Fetch root admins when component mounts
  }, []);

  return (
    <div>
      {!isRegistering && (
        <>
          <div style={{ alignItems: "center", width: "100%" }}>
            <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
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
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddAdminClick}
                style={{ margin: "10px" }}
              >
                Add Admin
              </Button>
              <Button
                variant="contained"
                color="info"
                style={{ margin: "10px" }}
                onClick={() => setShowRootAdmins(true)}
              >
                Show Root Admins
              </Button>
            </div>
          </div>
        </>
      )}
      <div className="col-md-12">
        {isRegistering ? (
          <AdminRegister onRegister={handleRegisterComplete} />
        ) : (
          <AdminDataTable searchTerm={searchTerm} rootAdmins={rootAdmins} />
        )}
      </div>
      <Dialog open={showRootAdmins} onClose={() => setShowRootAdmins(false)}>
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
    </div>
  );
}

export default SearchBar;

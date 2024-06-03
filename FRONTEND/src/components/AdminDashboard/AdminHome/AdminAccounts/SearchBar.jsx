import { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AdminDataTable from "./AdminDataTable";
import AdminRegister from "./AdminRegister";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

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
            </div>
          </div>
        </>
      )}
      <div className="col-md-12">
        {isRegistering ? (
          <AdminRegister onRegister={handleRegisterComplete} />
        ) : (
          <AdminDataTable searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;

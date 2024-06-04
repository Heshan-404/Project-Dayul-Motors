import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import UserDataTable from "./UserDataTable";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email or ID or Phone Number"
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px" }}
        >
          Search
        </Button>
      </form>
      <div className="col-md-12">
        <UserDataTable searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default SearchBar;

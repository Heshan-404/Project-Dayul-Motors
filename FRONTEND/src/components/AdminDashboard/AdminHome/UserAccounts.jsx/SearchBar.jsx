import { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import UserDataTable from "./UserDataTable";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataTable, setDataTable] = useState(
    <UserDataTable searchTerm={searchTerm} />
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setDataTable(<UserDataTable searchTerm={searchTerm} />);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px" }}
        >
          Search
        </Button>
      </form>
      <div className="col-md-12">{dataTable}</div>
    </div>
  );
}

export default SearchBar;

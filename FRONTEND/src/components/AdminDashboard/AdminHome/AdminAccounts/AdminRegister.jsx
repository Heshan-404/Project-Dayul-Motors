import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import axiosInstance from "../../../../axiosConfig";

const validationMessages = {
  fullName: "Full Name is required",
  email: "Enter a valid email",
  phoneNo: "Enter a valid phone number",
  address: "Address is required",
  password: "Password should be of minimum 8 characters length",
  confirmPassword: "Passwords must match",
  level: "Level is required",
};

// eslint-disable-next-line react/prop-types
function AdminRegister({ onRegister }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    confirmPassword: "",
    level: 1, // Default preselected level
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    if (name === "confirmPassword" && values.password !== value) {
      setErrors({
        ...errors,
        confirmPassword: validationMessages.confirmPassword,
      });
    } else if (name === "confirmPassword" && values.password === value) {
      setErrors({ ...errors, confirmPassword: "" });
    } else {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    if (name === "phoneNo") {
      const phoneNoRegex = /^[0-9]{10}$/;
      if (!phoneNoRegex.test(value)) {
        setErrors({ ...errors, [name]: validationMessages[name] });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, [name]: validationMessages[name] });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (value === "") {
      setErrors({ ...errors, [name]: validationMessages[name] });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    try {
      const response = await axiosInstance.post("/auth/admin/register", values);
      console.log("Admin registered:", response.data);
      onRegister(); // Call the onRegister callback to show the data table again
    } catch (err) {
      console.error("Error registering admin:", err);
      setErrors({
        apiError: err.response ? err.response.data.message : err.message,
      });
    }
  };

  return (
    <Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Register Admin</Typography>
      </Grid>
      {errors.apiError && (
        <Grid item xs={12}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errors.apiError}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="fullName"
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleChange}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="phoneNo"
            name="phoneNo"
            label="Phone No"
            value={values.phoneNo}
            onChange={handleChange}
            error={Boolean(errors.phoneNo)}
            helperText={errors.phoneNo}
          />
          <TextField
            fullWidth
            margin="normal"
            id="address"
            name="address"
            label="Address"
            value={values.address}
            onChange={handleChange}
            error={Boolean(errors.address)}
            helperText={errors.address}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <TextField
            fullWidth
            margin="normal"
            id="level"
            name="level"
            label="Level"
            style={{ width: "300px" }}
            select
            value={values.level}
            onChange={handleChange}
            error={Boolean(errors.level)}
            helperText={errors.level}
          >
            <MenuItem value={1}>Order Manager</MenuItem>
            <MenuItem value={2}>Product Manager</MenuItem>
            <MenuItem value={3}>Admin</MenuItem>
          </TextField>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={Object.values(errors).some((error) => error !== "")}
            style={{ marginTop: "10px" }}
          >
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdminRegister;

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };

  const handleLogin = () => {
    // Your login logic goes here
    console.log("Email:", email);
    console.log("Password:", password);
    // After successful login, you can navigate to the desired page
    navigate("/home");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={!!emailError || !!passwordError || !email || !password}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default AdminLogin;

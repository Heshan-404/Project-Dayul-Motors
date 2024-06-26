import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { Button, styled, TextField, CircularProgress } from "@mui/material";
import { yellow } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to homepage or dashboard
    }
  }, [navigate]);

  // Function to handle input changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Function to validate individual fields
  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "fullName":
        if (!value) message = "Full Name is required";
        break;
      case "email":
        if (!value) {
          message = "Email Address is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          message = "Invalid Email Address ";
        }
        break;
      case "phoneNo":
        if (!value) {
          message = "Phone Number is required";
        } else if (!/^0\d{9}$/.test(value)) {
          message = "Invalid Phone Number";
        }
        break;
      case "address":
        if (!value) message = "Address is required";
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 8) {
          message = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          message =
            "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          message = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    return message;
  };

  // Function to validate all fields in the form
  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    }
    return newErrors;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Show loader
      try {
        const response = await axiosInstance.post("/auth/user/register", {
          fullName: formData.fullName,
          email: formData.email,
          phoneNo: formData.phoneNo,
          address: formData.address,
          password: formData.password,
        });

        if (response.status === 201) {
          setSuccessMessage("Registration successful!");
          setFormData({
            fullName: "",
            email: "",
            phoneNo: "",
            address: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/signin");
        } else {
          setServerError(response.data.message || "Registration failed");
        }
      } catch (error) {
        if (error.response) {
          setServerError(error.response.data.message || "Registration failed");
        } else {
          setServerError("An error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false); // Hide loader
      }
    }
  };

  // Effect to clear server error and success message after 5 seconds
  useEffect(() => {
    if (serverError || successMessage) {
      const timer = setTimeout(() => {
        setServerError("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [serverError, successMessage]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  }));

  // Function to handle input in email field
  const handleEmailInputChange = (e) => {
    const inputValue = e.target.value;
    const allowedCharacters = /^[A-Za-z0-9.@]*$/;
    if (allowedCharacters.test(inputValue)) {
      setFormData({ ...formData, email: inputValue });
    }
  };

  // Function to handle input in phone number field
  const handlePhoneNoInputChange = (e) => {
    const inputValue = e.target.value;
    const allowedCharacters = /^[0-9]*$/;
    if (allowedCharacters.test(inputValue) && inputValue.length <= 10) {
      if (inputValue.length === 1 && inputValue !== "0") {
        // Force the first digit to be '0'
        setFormData({ ...formData, phoneNo: "0" });
      } else {
        setFormData({ ...formData, phoneNo: inputValue });
      }
    }
  };

  return (
    <div>
      <div
        className="LoginPage"
        style={{ marginTop: "150px", marginBottom: "100px" }}
      >
        <style>{`
        *, *:before, *:after {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
         
        .LoginPage {
          display: flex; 
          justify-content: center; 
        }
        
        #shapeB, #shapeA {
          height: 200px;
          width: 200px;
          position: absolute;
          border-radius: 50%;
        }
        #shapeB {
          background-image: linear-gradient(#ad1894, #f67723);
           
        }
        #shapeA {
          background-image: linear-gradient(to right, #ee1ea9, black);
          
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 400px;
          background-color: rgba(255, 255, 255, 0.13);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 30px rgba(8, 7, 16, 0.6);
          padding: 50px 35px;
          z-index: 1;
        }
        form * {
          font-family: Poppins, sans-serif;
          color: black;
          letter-spacing: 0.5px;
          outline: none;
          border: none;
        }
        form h3 {
          font-size: 32px;
          font-weight: 500;
          line-height: 42px;
          text-align: center;
        }
        form h4 {
          font-size: 18px;
          font-weight: 400;
          line-height: 28px;
          text-align: center;
          margin-bottom: 30px;
        }
        .MuiTextField-root {
          margin-top: 20px;
          width: 100%;
        }
        .button {
          margin-top: 50px;
          color: #080710;
          width: 75%;
          background-color: rgb(247, 255, 16);
          padding: 10px 20px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
          align-self: flex-start;
        }
        .success, .server-error {
          margin-top: 20px;
          font-size: 12px;
          text-align: center;
          width: 100%;;
          color:"red";
        }
        .fade {
          animation: fadeOut 5s forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
        <div
          className="shapeB"
          id="shapeB"
          style={{ margin: "-100px", marginLeft: "-450px" }}
        ></div>
        <div
          className="shapeA"
          id="shapeA"
          style={{ marginLeft: "380px", marginTop: "620px" }}
        ></div>
        <form className="s" onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          Register to Dayul motors
          <TextField
            label="Full Name"
            variant="outlined"
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            onKeyUp={handleChange} // Validate on key release
          />
          <TextField
            label="Email Address"
            variant="outlined"
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleEmailInputChange}
            error={!!errors.email}
            helperText={errors.email}
            onKeyUp={handleChange} // Validate on key release
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="text"
            name="phoneNo"
            id="phoneNo"
            value={formData.phoneNo}
            onChange={handlePhoneNoInputChange}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
            onKeyUp={handleChange} // Validate on key release
          />
          <TextField
            label="Address"
            variant="outlined"
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            onKeyUp={handleChange} // Validate on key release
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            onKeyUp={handleChange} // Validate on key release
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            onKeyUp={handleChange} // Validate on key release
          />
          {isLoading ? (
            // Show loader when isLoading is true
            <CircularProgress
              size={24}
              color="secondary"
              style={{ marginTop: "40px" }}
            />
          ) : (
            <ColorButton
              className="button"
              type="submit"
              variant="contained"
              endIcon={<LoginIcon />}
            >
              Sign Up
            </ColorButton>
          )}
          {serverError && (
            <div className="server-error fade" style={{ color: "red" }}>
              {serverError}
            </div>
          )}
          {successMessage && (
            <div className="success fade" style={{ color: "red" }}>
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

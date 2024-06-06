import React, { useState, useRef } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import NavigationBar from "../../components/Homepage/NavigationBar";
import Footer from "../../components/Homepage/Footer";
import KeyIcon from "@mui/icons-material/Key";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isGetOtpButtonDisabled, setIsGetOtpButtonDisabled] = useState(true);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isGetOtpLoading, setIsGetOtpLoading] = useState(false);
  const [isConfirmOtpLoading, setIsConfirmOtpLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  const inputRefs = useRef([]);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleGetOTP = async () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    setIsGetOtpLoading(true);
    try {
      const response = await axiosInstance.post("/auth/user/reset", { email });

      if (response.status === 200) {
        showMessage("OTP has been sent to your email.");
        setOpenSnackbar(true); // Open Snackbar
        setSnackbarMessage("OTP sent successfully!");
      } else {
        showMessage(response.data.message || "Failed to send OTP.");
        setOpenSnackbar(true); // Open Snackbar
        setSnackbarMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setOpenSnackbar(true); // Open Snackbar
      setSnackbarMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setIsGetOtpLoading(false);
    }
  };

  const handleConfirmOTP = async () => {
    setIsConfirmOtpLoading(true);
    try {
      const response = await axiosInstance.post("/auth/user/checkOTP", {
        email,
        otp: otp.join(""),
      });

      if (response.status === 200) {
        showMessage("OTP confirmed. Proceed with password reset.");
        setIsOtpConfirmed(true);
        setOTP(response.data.OTP);
      } else {
        showMessage(response.data.message || "Failed to verify OTP.");
        setOpenSnackbar(true); // Open Snackbar
        setSnackbarMessage(response.data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setOpenSnackbar(true); // Open Snackbar
      setSnackbarMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setIsConfirmOtpLoading(false);
    }
  };

  // Update the button disabled state for Get OTP button based on email validation
  React.useEffect(() => {
    setIsGetOtpButtonDisabled(!validateEmail(email));
  }, [email]);

  // Update the button disabled state for Confirm button based on OTP validation
  React.useEffect(() => {
    setIsConfirmButtonDisabled(otp.some((value) => value === ""));
  }, [otp]);

  // Function to handle changes in OTP input fields
  const handleOtpChange = (index, value) => {
    if (/^[a-zA-Z]*$/.test(value)) {
      // Convert lowercase to uppercase
      value = value.toUpperCase();

      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      // Move focus to the previous input if backspace is pressed
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }

      // Move focus to the next input if available
      if (index < 5 && value !== "") {
        inputRefs.current[index + 1].focus();
      }

      // Hide message when changing OTP
      hideMessage();
    }
  };

  // Function to show message and initiate fade animation
  const showMessage = (msg) => {
    setMessage(msg);
    setIsMessageVisible(true);
    setTimeout(() => {
      hideMessage();
    }, 5000); // Set timeout for 5 seconds
  };

  // Function to hide message and initiate fade out animation
  const hideMessage = () => {
    setIsMessageVisible(false);
  };

  // Apply fade animation based on message visibility
  const messageClassName = isMessageVisible ? "fade" : "";

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  if (isOtpConfirmed) {
    localStorage.setItem("OTP", OTP);
    return <Navigate to="/change-password" state={{ email }} />;
  }

  return (
    <div>
      <NavigationBar />
      <div
        className="LoginPage"
        style={{ marginTop: "150px", marginBottom: "100px" }}
      >
        <style>{` *, *:before, *:after {
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
        label {
          display: block; 
          font-size: 16px;
          font-weight: 500;
          align-self: flex-start;
        }
        input {
          display: block;
          height: 40px;
          width: 100%; 
          border: 1px solid black;	
          border-radius: 3px;
          padding: 0 10px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 300;
          
        }
        ::placeholder {
          color: "black";
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
        h6 {
          margin-top: 20px;
          cursor: pointer;
          text-align: center;
        } 
         `}</style>
        <div className="background">
          <div className="shapeB" id="shapeB" style={{ margin: "-80px" }}></div>
          <div
            className="shapeA"
            id="shapeA"
            style={{ margin: "280px", marginTop: "400px" }}
          ></div>
        </div>
        <form action="" className="b">
          <h3>Forget Password</h3>
          <p>
            {`Please enter your email address, we'll send you an instruction to
            help you reset your password.`}
          </p>
          <TextField
            label="Enter Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(!validateEmail(e.target.value));
              hideMessage(); // Hide message when email changes
            }}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            required
          />
          {isGetOtpLoading ? (
            <CircularProgress
              size={24}
              color="secondary"
              style={{ marginTop: "18px" }}
            />
          ) : (
            <Button
              startIcon={<KeyIcon style={{ fill: "#ffffff" }} />}
              size="small"
              variant="contained"
              onClick={handleGetOTP}
              className="mt-3"
              disabled={isGetOtpButtonDisabled}
            >
              Get OTP
            </Button>
          )}
          <p
            className={messageClassName}
            style={{ color: "red", fontSize: "12px" }}
          >
            {isMessageVisible && message}
          </p>
          <p>Please check your email and enter the OTP code:</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                variant="outlined"
                type="text"
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                style={{ width: "50px", margin: "0 5px" }}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", textTransform: "uppercase" },
                }}
                required
              />
            ))}
          </div>
          {isConfirmOtpLoading ? (
            <CircularProgress
              size={24}
              color="secondary"
              style={{ marginTop: "18px" }}
            />
          ) : (
            <Button
              startIcon={<Fingerprint style={{ fill: "white" }} />}
              size="small"
              variant="contained"
              onClick={handleConfirmOTP}
              className="mt-3"
              disabled={isConfirmButtonDisabled}
            >
              Confirm
            </Button>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="info"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </div>
      <Footer />
    </div>
  );
}

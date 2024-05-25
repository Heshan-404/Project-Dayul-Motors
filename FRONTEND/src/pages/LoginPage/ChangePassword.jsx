import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";
import Footer from "../../components/Homepage/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/Homepage/NavigationBar";
import axiosInstance from "../../axiosConfig";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const email = state && state.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isConfirmValid, setConfirmValid] = useState(false);
  const [isOTP, setOTP] = useState(false);
  useEffect(() => {
    const OTP = localStorage.getItem("OTP");
    if (!OTP) {
      // If OTP doesn't exist in localStorage, navigate to "/home"
      navigate("/forget-password");
    } else {
      // If OTP exists, setOTP to true
      setOTP(true);
      localStorage.removeItem("OTP");
    }
  }, [navigate]); // Include navigate in the dependency array to prevent stale closure

  useEffect(() => {
    // Password validation
    setPasswordValid(password.length >= 8);

    // Confirm password validation
    setConfirmValid(confirmPassword === password);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform password reset action
    try {
      const response = await axiosInstance.post("/auth/user/reset-password", {
        password,
        email,
      });

      if (response.status === 200) {
        localStorage.removeItem("OTP");
        setMessage("Password reset successful. Redirecting to login page...");
        setTimeout(() => {
          navigate("/signin");
        }, 3000); // Redirect to login page after 3 seconds
      } else {
        setMessage(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      {isOTP && (
        <div>
          <div
            className="LoginPage"
            style={{ marginTop: "150px", marginBottom: "100px" }}
          >
            <NavigationBar />
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
      height: 520px;
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
      margin-top: 20px;
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
    .button {a
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
              {" "}
              <div
                className="shapeB"
                id="shapeB"
                style={{ margin: "-80px" }}
              ></div>
              <div
                className="shapeA"
                id="shapeA"
                style={{ margin: "280px", marginTop: "400px" }}
              ></div>
              <form onSubmit={handleSubmit}>
                <h3>Change Password</h3>
                <label htmlFor="Password">Password :</label>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    border: isPasswordValid
                      ? "1px solid black"
                      : "1px solid red",
                  }}
                />
                <label htmlFor="ConfirmPassword">Confirm Password :</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  style={{
                    border: isConfirmValid
                      ? "1px solid black"
                      : "1px solid red",
                  }}
                />
                {message && (
                  <p style={{ color: "red", fontSize: "12px" }}>{message}</p>
                )}
                <Button
                  startIcon={<KeyIcon style={{ fill: "#ffffff" }} />}
                  size="large"
                  variant="contained"
                  type="submit"
                  className="mt-3"
                  disabled={!isPasswordValid || !isConfirmValid}
                >
                  Change
                </Button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

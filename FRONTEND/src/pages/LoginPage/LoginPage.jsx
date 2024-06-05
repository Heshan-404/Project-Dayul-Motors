import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import NavigationBar from "../../components/Homepage/NavigationBar";
import Footer from "../../components/Homepage/Footer";
import {
  Button,
  Stack,
  styled,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { yellow } from "@mui/material/colors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    if (
      email &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)
    ) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
      );
    } else {
      setPasswordError("");
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("All fields are required");
      return;
    }
    if (emailError || passwordError) {
      setFormError("Please fix the errors before submitting");
      return;
    }
    setIsLoading(true); // Show loader
    try {
      const response = await axiosInstance.post("/auth/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.name);
        navigate("/home");
      } else {
        setFormError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setIsLoading(false); // Hide loader after login attempt
    }
  };

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => {
        setFormError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "#f7ff10",
      color: "black",
    },
  }));

  // Function to handle input in email field
  const handleEmailInputChange = (e) => {
    const inputValue = e.target.value;
    const allowedCharacters = /^[A-Za-z0-9.@]*$/;
    if (allowedCharacters.test(inputValue)) {
      setEmail(inputValue);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ width: "100vw" }}>
        <div
          className="LoginPage"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <style>{`
        h6:hover {
          color: #666666; /* Change to desired hover color */
        }
        
        .button:hover {
          background-color: transparent;
          border-color: #f7ff10;
          color: #f7ff10;
        }
        *, *:before, *:after {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
         
        .LoginPage {
          display: flex; 
          justify-content: center; 
          align-items: center;
          background-image: url('/path/to/your/background.jpg');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
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
          animation: fadeIn 1s ease-in-out;
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
        h6 {
          margin-top: 20px;
          cursor: pointer;
          text-align: center;
        }
        .fade {
          animation: fadeOut 5s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
          <div>
            <div className="background ">
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
              <form onSubmit={handleLogin}>
                <h3>Sign in</h3>
                <h4>Log in to Dayul Motors</h4>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="text"
                  value={email}
                  onChange={handleEmailInputChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                {formError && (
                  <Alert severity="error" className="fade">
                    {formError}
                  </Alert>
                )}
                {error && (
                  <Alert severity="error" className="fade">
                    {error}
                  </Alert>
                )}
                <Stack spacing={2} direction="row">
                  {isLoading ? (
                    // Show loader when isLoading is true
                    <CircularProgress
                      size={24}
                      color="secondary"
                      style={{ marginTop: "15px" }}
                    />
                  ) : (
                    <ColorButton
                      startIcon={<LoginIcon style={{ fill: "black" }} />}
                      size="large"
                      variant="contained"
                      type="submit"
                      className="mt-3"
                    >
                      Login Now
                    </ColorButton>
                  )}
                </Stack>
                <div className="d-flex">
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <h6>Create Account</h6>
                  </Link>
                  <Link
                    to="/forget-password"
                    style={{ textDecoration: "none" }}
                    className="ms-4"
                  >
                    <h6>Forget Password</h6>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

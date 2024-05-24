import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig"; // Adjust the import path as needed

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to homepage or dashboard
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

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
          message = "Email Address is invalid";
        }
        break;
      case "phoneNo":
        if (!value) message = "Phone Number is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axiosInstance.post("/auth/register", {
          fullName: formData.fullName,
          email: formData.email,
          phoneNo: formData.phoneNo,
          address: formData.address,
          password: formData.password,
        });

        if (response.status === 200) {
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
      }
    }
  };

  return (
    <div className="LoginPage">
      <style>
        {`
          *,*:before,*:after{
            padding: 0%;
            margin: 0%;
            box-sizing: bordeer-box;
        }
        body{
            background-color: black;
            color: white;
        }
        .background{
            width: 430%;
            height: 520%;
            position: absolute;
            left: 50%;
            top:50%;
            transform: (-50%,-50%);
            
        }
        
        #shapeB{
            height:200px;
            width:200px;
            position: absolute;
            border-radius:50%; 
        }
        #shapeA{
            height:200px;
            width:200px;
            position: absolute;
            border-radius:50%; 
        }
        #shapeB{
            background-image: linear-gradient(#ad1894,#f67723);
            left: -280px;
            top: -120px;
        }
        #shapeA{
            background-image: linear-gradient(to right,#ee1ea9,black);
            right: 100px;
            top: -80px;
        }
        
        .s{
            height: 900px;
            width: 400px;
            background-color: rgba(255,255,255, 0.13);
            position: absolute;
            transform: translate(-50%,-50px);
            top: 50%;
            left: 50%;
            border-radius: 3%;
            backdrop-filter:blur(10px);
            border: 2px solid rgba(255 ,255,255,0.1);
            box-shadow: 0 0 30px rgba(8,7,16, 0.6);
            padding: 50px 35px;
        }
        
        form *{
            font-family:poppins,sans-serif;
            color: #ffffff;
            letter-spacing:0.5px;
            outline: none;
            border:none;
        }
        form h3{
            font-size: 32px;
            font-weight: 500px;
            line-height: 42px;
            text-align: center;
        }
        label{
            display: block;
            margin-top: 30px;
            font-size: 16px;
            font-weight: 500250;
        }
        input{
            display: block;
            height: 40px;
            width: 100%;
            background-color: rgba(255 ,255,255,0.07);
            border-radius: 3px;
            padding:0 10px ;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 300px;
        }
        
        ::placeholder{
            color: #e5e5e5;
        }
        
        button{
            margin-top: 50px;
            color: #080710;
            width: 75%;
            background-color: rgb(247, 255, 16);
            padding: 5px 10px;
            font-size: 15px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            margin-left: 40px;
        }
        
        
        
        `}
      </style>
      <div className="background">
        <div className="shapeA" id="shapeA"></div>
        <div className="shapeB" id="shapeB"></div>
      </div>
      <form className="s" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        Register to Dayul motors
        <label htmlFor="fullName">Full Name :</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField("fullName", formData.fullName);
            setErrors({ ...errors, fullName: message });
          }}
        />
        {errors.fullName && <div className="error">{errors.fullName}</div>}
        <label htmlFor="email">Email Address :</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField("email", formData.email);
            setErrors({ ...errors, email: message });
          }}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <label htmlFor="phoneNo">Phone Number :</label>
        <input
          type="text"
          name="phoneNo"
          id="phoneNo"
          placeholder="Phone Number"
          value={formData.phoneNo}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField("phoneNo", formData.phoneNo);
            setErrors({ ...errors, phoneNo: message });
          }}
        />
        {errors.phoneNo && <div className="error">{errors.phoneNo}</div>}
        <label htmlFor="address">Address :</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField("address", formData.address);
            setErrors({ ...errors, address: message });
          }}
        />
        {errors.address && <div className="error">{errors.address}</div>}
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField("password", formData.password);
            setErrors({ ...errors, password: message });
          }}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={() => {
            const message = validateField(
              "confirmPassword",
              formData.confirmPassword
            );
            setErrors({ ...errors, confirmPassword: message });
          }}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
        <button type="submit">Register Now</button>
        {successMessage && <div className="success">{successMessage}</div>}
        {serverError && <div className="server-error">{serverError}</div>}
      </form>
    </div>
  );
}

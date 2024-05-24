import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig"; // Adjust the import path as needed

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect to a protected route
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home"); // Redirect to a protected route
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

  return (
    <div className="LoginPage">
      <style>{`*,*:before,*:after{
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
    right: 280px;
    top: 120px;
}

form
{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255, 0.13);
    position: absolute;
    transform: translate(-50%,-50px);
    top: 50%;
    left: 50%;
    border-radius: 10%;
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
h6{
  margin-left: 160px;
  margin-top: 20px;
 cursor: pointer;
  


}








      `}</style>
      <div className="background">
        <div className="shapeA" id="shapeA"></div>
        <div className="shapeB" id="shapeB"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Sign in</h3>
        <h4>Log in to Dayul Motors</h4>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <button type="submit">Login Now</button>
        <Link to="/forget-password">
          <h6>Forget Password</h6>
        </Link>
      </form>
    </div>
  );
}

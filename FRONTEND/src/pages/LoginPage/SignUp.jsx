import "./SignUp.css";
export default function Signup() {
  return (
    <div className="LoginPage">
         <div className="background">
         <div className="shapeA" id="shapeA"></div>
         <div className="shapeB" id="shapeB"></div>
        </div>
    <form action="" className="s">
      <h3>Sign up</h3>
      Register to  Dayul motors
          
      
      <label htmlFor="Full Name">Full Name :</label> 
      <input type="text" name="Full Name" id="Full Name"
            placeholder="Full Name"
            />
            <label htmlfor="Email Address">Email Address :</label>
            <input type="text" name="Email Address" id="Email Address" 
              placeholder="Email Address"  
               />
             <label htmlfor="Mobile Number">Mobile Number :</label>
            <input type="text" name="Mobile Number" id="Mobile Number" 
              placeholder="Mobile Number"  
               />
              <label htmlfor="Address">Address :</label>
            <input type="text" name="Address" id="Address" 
              placeholder="Address"  
               /> 
                <label htmlfor="Password">Password :</label>
            <input type="text" name="Password" id="Password" 
              placeholder="Password"  
               /> 
                <label htmlfor="Conform Password"> Conform Password :</label>
            <input type="text" name="Conform Password" id="Conform Password" 
              placeholder="Conform Password"  
               /> 
                 
              <button type="button">Register Now</button>
               
           
      
    </form>
  </div> 
  )
}      
 


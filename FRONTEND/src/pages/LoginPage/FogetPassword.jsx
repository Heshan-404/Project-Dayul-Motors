import "./ForgetPassword.css";
export default function ForgetPassword() {
    return (
        <div className="ForgetPassword">
             <div className="background">
             <div className="shapeA" id="shapeA"></div>
             <div className="shapeB" id="shapeB"></div>
          </div>
          <form action="" className="b">
          <h3>
                Forget Password
          </h3>
          
          Please enter your email address ,We'll send you an instruction to help you reset password
          
          <label htmlFor="Enter Email">Enter Email:</label> 
          <input type="text" name="Enter Email" id="Enter Email"
                placeholder="Email "
                />
                <button class="button1" type="button">Get OTP</button>



                
                <p>please check the mail box and Enter OTP code</p>
                      
                <label htmlfor="OTP">OTP:</label>
                <input type="text" name="OTP" id="OTP" 
                  placeholder="OTP"  
                   />
                   <button class="button2" type="button">Cofirm</button>
               
                   </form>
                </div> 
      )







}
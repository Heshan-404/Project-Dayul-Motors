import "./Signin.css";
export default function LoginPage() {
  return (
    <div className="LoginPage">
         <div className="background">
         <div className="shapeA" id="shapeA"></div>
         <div className="shapeB" id="shapeB"></div>
      </div>
      <form action="">
      <h3>
           Sign in
      </h3>
      <h4>
      log in to Dayul motors
      </h4>
      <label htmlFor="username">username :</label> 
      <input type="text" name="username" id="username"
            placeholder="Email or username"
            />
            <label htmlfor="password">Password :</label>
            <input type="password" name="password" id="password" 
              placeholder="Password"  
               />
               <button type="button">Login Now</button>
               <h6>
           Forgote Password
      </h6>
               </form>
            </div> 
  )
}      
 


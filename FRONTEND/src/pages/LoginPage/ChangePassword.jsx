import "./ChangePassword.css";
export default function ChangePassword() {
  return (
    <div className="LoginPage">
         <div className="background">
         <div className="shapeA" id="shapeA"></div>
         <div className="shapeB" id="shapeB"></div>
      </div>
      <form action="">
      <h3>
           Change Password
      </h3>
      
      Add new Password
      
      <label htmlFor="Password">Password :</label> 
      <input type="text" name="Password" id="Password"
            placeholder="Password"
            />
            <label htmlfor=" Conform password"> Conform Password :</label>
            <input type="Password" name="Conform Password" id="Conform Password" 
              placeholder="Password"  
               />
               <button type="button">Confirm</button>
               </form>
            </div> 
  )
}
export default function ChangePassword() {
  return (
    <div className="LoginPage">
      <style>{`
      *,*:before,*:after{
        padding: 0%;
        margin: 0%;
        box-sizing: bordeer-box;
    }
    body{
        background-color:black;
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
    
    
    
    `}</style>
      <div className="background">
        <div className="shapeA" id="shapeA"></div>
        <div className="shapeB" id="shapeB"></div>
      </div>
      <form action="">
        <h3>Change Password</h3>
        Add new Password
        <label htmlFor="Password">Password :</label>
        <input
          type="text"
          name="Password"
          id="Password"
          placeholder="Password"
        />
        <label htmlFor=" Conform password"> Conform Password :</label>
        <input
          type="Password"
          name="Conform Password"
          id="Conform Password"
          placeholder="Password"
        />
        <button type="button">Confirm</button>
      </form>
    </div>
  );
}

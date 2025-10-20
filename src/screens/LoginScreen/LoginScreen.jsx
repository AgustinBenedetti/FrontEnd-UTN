import React from "react";
import { useLocation } from "react-router";
import Login from "../../Components/Login/Login";


const LoginScreen = () => {

  return (
    <div className="Container-login-screen">
      <div className="Container-login">
        <Login/>
      </div>
      
    </div>
    
  )
}

export default LoginScreen;
    
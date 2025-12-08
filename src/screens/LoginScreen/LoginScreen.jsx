import React from "react";
import Login from "../../Components/Login/Login";
import "./LoginScreen.css"; 

const LoginScreen = () => {
  return (
    <div className="login-screen">
      <div className="login-screen__card">
        <Login />
      </div>
    </div>
  );
};

export default LoginScreen;

import React from "react";
import Register from "../../Components/Register/Register.jsx";
import "./RegisterScreen.css"; 

const RegisterScreen = () => {
  return (
    <div className="register-screen">
      <div className="register-screen__card">
        <Register />
      </div>
    </div>
  );
};

export default RegisterScreen;

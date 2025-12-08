import React from "react";
import useFetch from "../../hooks/useFetch";
import { register } from "../../serivce/authService";
import useForm from "../../hooks/useForm";
import { Link } from "react-router";
import "./Register.css"; 

const Register = () => {
  const REGISTER_FORM_FIELDS = {
    USERNAME: "username",
    EMAIL: "email",
    PASSWORD: "password",
  };

  const initial_form_state = {
    [REGISTER_FORM_FIELDS.USERNAME]: "",
    [REGISTER_FORM_FIELDS.EMAIL]: "",
    [REGISTER_FORM_FIELDS.PASSWORD]: "",
  };

  const { response, error, loading, sendRequest } = useFetch();

  function onRegister(form_state_sent) {
    sendRequest(() => {
      return register(
        form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
        form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
        form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
      );
    });
  }

  const { form_state, onInputChange, handleSubmit } = useForm(
    initial_form_state,
    onRegister
  );

  return (
    <div className="register">
        <div className="register__logo">
            <img src="/public/images/Slack-loginpng.png" alt="logo-Slack" />
        </div>
        {/* Tabs SIGN IN / SIGN UP */}
        <div className="register__tabs">
            <Link to="/login">
                <button className="register__tab">SIGN IN</button>
            </Link>
            <button className="register__tab register__tab--active">SIGN UP</button>
        </div>


        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register__form">
            <div className="register__field">
            <label htmlFor="Username" className="register__label">Username</label>
            <input
                type="text"
                placeholder="PepitoCrack"
                value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                name={REGISTER_FORM_FIELDS.USERNAME}
                id="username"
                onChange={onInputChange}
                className="register__input"
            />
            </div>

            <div className="register__field">
              <label htmlFor="Email" className="register__label">Email</label>
              <input
                type="email"
                placeholder="pepito@example.com"
                value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                name={REGISTER_FORM_FIELDS.EMAIL}
                onChange={onInputChange}
                id="email"
                className="register__input"
              />
            </div>

            <div className="register__field">
              <label htmlFor="Password" className="register__label">Password</label>
              <input
                type="password"
                placeholder="Pepito1234"
                value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                name={REGISTER_FORM_FIELDS.PASSWORD}
                onChange={onInputChange}
                id="password"
                className="register__input"
              />
            </div>

            {error && (
                <span className="register__message register__message--error">
                    {error}
                </span>
            )}
            {response && (
                <span className="register__message register__message--success">
                    User successfully registered
                </span>
            )}

            <button
            type="submit"
            className="register__button"
            disabled={loading}
            >
                {loading ? "REGISTERING..." : "REGISTER"}
            </button>
        </form>
        
        <div className="register__footer">
            <span className="register__footer-text">
                Already have an account?{" "}
                <Link to="/login" className="register__footer-link">
                    Sign in
                </Link>
            </span>
        </div>
    </div>
  );
};

export default Register;

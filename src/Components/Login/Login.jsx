import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { login } from "../../serivce/authService";
import useForm from "../../hooks/useForm";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.css"; 

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const from = query.get("from");
    if (from === "verified_email") {
      alert("Has validado tu mail exitosamente");
    }
  }, []);

  const LOGIN_FORM_FIELDS = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  const initial_form_state = {
    [LOGIN_FORM_FIELDS.EMAIL]: "",
    [LOGIN_FORM_FIELDS.PASSWORD]: "",
  };

  const { response, error, loading, sendRequest, resetResponse } = useFetch();

  function handleLogin(form_state_sent) {
    resetResponse();
    sendRequest(() => {
      return login(
        form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
        form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
      );
    });
  }

  const { form_state, onInputChange, handleSubmit } = useForm(
    initial_form_state,
    handleLogin
  );

  useEffect(() => {
    if (response && response.ok) {
      onLogin(response.body.auth_token);
      localStorage.setItem(
        "user_email",
        form_state[LOGIN_FORM_FIELDS.EMAIL]
      );
    }
  }, [response]);

  return (
    <div className="login">
      <div className="login__logo">
        <img src="/images/slack-login.png" alt="logo-Slack" />
      </div>
      {/* Tabs SIGN IN / SIGN UP */}
      <div className="login__tabs">
        <button className="login__tab login__tab--active">SIGN IN</button>
        <Link to="/register">
          <button className="login__tab">SIGN UP</button>
        </Link>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__field">
          <label htmlFor="Email" className="login__label"> Email </label>
          <input
            type="email"
            placeholder="pepito@example.com"
            value={form_state[LOGIN_FORM_FIELDS.EMAIL]}
            name={LOGIN_FORM_FIELDS.EMAIL}
            onChange={onInputChange}
            id="email"
            className="login__input"
          />
        </div>

        <div className="login__field">
          <label htmlFor="Passsword" className="login__label">Password</label>
          <input
            type="password"
            placeholder="Pepito1234"
            value={form_state[LOGIN_FORM_FIELDS.PASSWORD]}
            name={LOGIN_FORM_FIELDS.PASSWORD}
            onChange={onInputChange}
            id="password"
            className="login__input"
          />
        </div>

        {error && <span className="login__message login__message--error">{error}</span>}
        {response && (
          <span className="login__message login__message--success">
            Successful Login
          </span>
        )}

        <button
          type="submit"
          className="login__button"
          disabled={loading}
        >
          {loading ? "LOGGING IN..." : "LOG IN"}
        </button>
      </form>

    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import AuthGoogle from "../components/AuthGoogle";
import { useForm } from "../custom-hooks/useForm";
import { useValidationForm } from "../custom-hooks/validationForm";

const Signup = (props) => {
  const [values, handleInputChange] = useForm({
    username: "",
    email: "",
    password: "",
  });
  const [handleInputValidations, messageForm] = useValidationForm(values);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationForm = handleInputValidations(values);
    if (validationForm) {
      props.signup(values);
    }
  };

  const { username, email, password } = values;
  return (
    <div className="sign">
      <h1 className="sign__heading">Welcome!</h1>

      <form onSubmit={handleFormSubmit} className="sign__form">
        <label className="sign__form-label" htmlFor="username">
          Username *
        </label>
        <input
          className="sign__form-input"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleInputChange}
        />
        <label className="sign__form-label" htmlFor="email-sign">
          Email *
        </label>
        <input
          className="sign__form-input"
          type="text"
          name="email"
          id="email-sign"
          value={email}
          onChange={handleInputChange}
        />

        <label className="sign__form-label" htmlFor="password-sign">
          Password *
        </label>
        <input
          className="sign__form-input"
          type="password"
          name="password"
          id="password-sign"
          value={password}
          onChange={handleInputChange}
        />
        {props.message && <p className="sign__form-error">{props.message}</p>}
        {messageForm && <p className="sign__form-error">{messageForm}</p>}
        <button className="btn btn-sign" type="submit">
          Sign up
        </button>
      </form>
      <AuthGoogle type="signup" />

      <p className="sign__message">
        Don't have an account?
        <Link to={"/login"}>
          <span>Create one</span>
        </Link>
      </p>
    </div>
  );
};
export default withAuth(Signup);

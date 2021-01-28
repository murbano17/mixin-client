import React from "react";
import AuthGoogle from "../components/AuthGoogle";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import { useForm } from "../custom-hooks/useForm";
import { useValidationForm } from "../custom-hooks/validationForm";

const Login = (props) => {
  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const [handleInputValidations, messageForm] = useValidationForm(values);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationForm = handleInputValidations(values);
    if (validationForm) {
      props.login(values);
    }
  };
  const { email, password } = values;
  return (
    <div className="sign">
      <h1 className="sign__heading">Welcome back!</h1>
      <form onSubmit={handleFormSubmit} className="sign__form">
        <label className="sign__form-label" htmlFor="email">
          Email *
        </label>
        <input
          className="sign__form-input"
          type="text"
          name="email"
          id="email"
          placeholder="email@email.com"
          value={email}
          onChange={handleInputChange}
        />
        <label className="sign__form-label" htmlFor="password">
          Password *
        </label>
        <input
          className="sign__form-input"
          type="password"
          id="password"
          name="password"
          placeholder="******"
          value={password}
          onChange={handleInputChange}
        />
        {props.message && <p className="sign__form-error">{props.message}</p>}
        {messageForm && <p className="sign__form-error">{messageForm}</p>}

        <button className="btn btn-sign" type="submit">
          Log in
        </button>
      </form>
      <AuthGoogle type="login" />
      <p className="sign__message">
        Already have an account?
        <Link to={"/signup"}>
          <span>Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default withAuth(Login);

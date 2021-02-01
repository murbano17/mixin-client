import React from "react";
import GoogleLogin from "react-google-login";
import { withAuth } from "../lib/AuthProvider";

const AuthGoogle = (props) => {
  const responseSuccesGoogle2 = async (response) => {
    const tokenId = response.tokenId;
    const user = await response.profileObj.givenName;
    props.loginGoogle({ tokenId, user });
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="sign__google">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText="Log in"
        onSuccess={responseSuccesGoogle2}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div className="btn-google" onClick={renderProps.onClick}>
            <div className="btn-google-img"></div>
            <p className="btn-google-text">
              {props.type === "login"
                ? "Log in with google"
                : "Sign up with google"}
            </p>
          </div>
        )}
      />
    </div>
  );
};
export default withAuth(AuthGoogle);

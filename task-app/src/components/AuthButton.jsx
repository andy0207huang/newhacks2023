import React from "react";
import { GoogleLogin } from "react-google-login";
import "../index.css";

export default function AuthButton() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
  };
  const responseError = (response) => console.log(error);

  return (
    <div>
      <GoogleLogin
        className="auth-btn"
        clientId="261810734464-cftl1m5mi5nqpfsagmn09h09cg152tc1.apps.googleusercontent.com"
        buttonText="Sign In & Authenticate Calendar"
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={"single_host_origin"}
        responseType="code"
        accessType="offline"
        scope="openid email profile https://www.googleapis.com/auth/calendar"
      />
    </div>
  );
}

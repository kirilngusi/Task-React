import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Route, Redirect } from "react-router";
import { useHistory } from "react-router";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export const AuthUser = ({ authRoute }) => {
  const history = useHistory();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="spinner-container">
        <Spinner animation="grow" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return body;
};

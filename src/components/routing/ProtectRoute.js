import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Route, Redirect } from "react-router";
import { useHistory } from "react-router";
export const ProtectRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="grow" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          // <Redirect to="/login" />
          history.push("/login")
        )
      }
    />
  );
};

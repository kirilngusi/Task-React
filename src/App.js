import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { Home } from "./page/Home/Home";
import { Profile } from "./page/Profile/Profile";
import { ProtectRoute } from "./components/routing/ProtectRoute";
import { AuthUser } from "./components/auth/AuthUser";
import PostContextProvider from "./context/PostContext";
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <AuthUser {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <AuthUser {...props} authRoute="register" />}
            />

            <ProtectRoute exact path="/" component={Home} />
            <ProtectRoute exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

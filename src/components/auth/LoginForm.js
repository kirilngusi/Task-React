import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { parseJwt } from "../../utils/decodeJwt";
import { LOCAL_STORAGE_TOKEN } from "../../context/Constains";
import AlertMessage from "../Layout/AlertMessage";
const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);

      var access_token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
      // if (loginData.data.access_token === access_token) {
      //   console.log("login success");
      // history.push("/");
      // }
      if (!loginData) {
        setAlert({
          type: "danger",
          message: "Usename or Password not match !",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="col-md-4 mx-auto form-login" onSubmit={handleSubmit}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3 m-4" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            required
            onChange={onChangeLoginForm}
            value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3 m-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={onChangeLoginForm}
            value={password}
          />
        </Form.Group>

        <Button className="m-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="Not_account">
        <Button variant="primary" type="submit">
          <Link to="/register" className="link">
            Register
          </Link>
        </Button>
      </p>
    </>
  );
};

export default LoginForm;

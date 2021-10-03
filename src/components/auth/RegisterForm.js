import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import AlertMessage from "../Layout/AlertMessage";
const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    extra: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { extra, username, password, confirmPassword } = registerForm;

  const onChangeRegisForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(typeof [e.target.value]);

    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password not match !",
      });
      return;
    }
    console.log(extra, username, password, confirmPassword);
    try {
      const regisData = await registerUser(registerForm);
      // console.log(regisData);
      // if (regisData) {
      //   console.log("register success");
      //   history.push("/");
      // }
      if (!regisData) {
        setAlert({
          type: "danger",
          message: "Usename or Password is already available!",
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
        <Col>
          <Form.Group className="mb-3 m-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              required
              name="extra"
              onChange={onChangeRegisForm}
              value={extra}
            />
          </Form.Group>
        </Col>

        <Form.Group className="mb-3 m-4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            required
            onChange={onChangeRegisForm}
            value={username}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3 m-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={onChangeRegisForm}
                value={password}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 m-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                onChange={onChangeRegisForm}
                value={confirmPassword}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button className="m-3" variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p className="Not_account">
        <Button variant="primary" type="submit">
          <Link to="/login" className="link">
            Login
          </Link>
        </Button>
      </p>
    </>
  );
};

export default RegisterForm;

/*
@private route -- path/profile
@Nếu user chưa login, sẽ redirect về /login.
@Trang này hiển thị thông tin người dùng, hoặc hiển thị cái gì bạn thích lúc register (trong api có trường extra) 
@Có nút logout, sẽ xóa user trong redux và token trong localStorage, sau đó redirect về /login

*/
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export const Profile = () => {
  const { logoutUser } = useContext(AuthContext);
  const {
    authState: { authLoading, isAuthenticated, user, username },
  } = useContext(AuthContext);

  const [getInfo, setGetInfo] = useState("");

  const [getUser, setGetUser] = useState("");

  const delete_Token = () => {
    logoutUser();
  };

  useEffect(() => setGetInfo(user), []);
  useEffect(() => setGetUser(username), []);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Profile</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="link">
                Home
              </Link>
            </Nav>

            <Nav className="me-auto">
              <Nav.Link onClick={delete_Token}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="info">
        <div className="username">Username: {getUser}</div>
        <div className="name">Name: {getInfo}</div>
      </div>
    </>
  );
};

/*
@private route -- path /
@Nếu user chưa login, sẽ redirect về /login. 
@Trang này hiển thị thông tin từ API api/protected/random-quote. 
*/
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { PostContext } from "../../context/PostContext";
import axios from "axios";
import { apiUrl } from "../../context/Constains";
export const Home = () => {
  const {
    authState: { user, isAuthenticated },
  } = useContext(AuthContext);

  const { getContent } = useContext(PostContext);
  var getData;
  const [data, setData] = useState("");
  var body;

  const loadData = async () => {
    try {
      getData = await getContent();
      body = getData.data;
      setData(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => loadData(), [setData]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/profile" className="link">
                Profile
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">{data}</div>
    </>
  );
};

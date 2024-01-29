import "./App.css";
import "./style/style.css";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ProjectView from "./components/ProjectView";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import "./style/navbarStyles.css";

export default function App() {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleLoginClick = () => {
    setIsShowRegister(false);
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
  const handleRegisterClick = () => {
    setIsShowLogin(false);
    setIsShowRegister((isShowRegister) => !isShowRegister);
  };

  const logOut = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    try {
      axios
        .post("http://localhost:8080/api/user/verify", null, {
          headers: {
            Authorization: "Bearer: " + JSON.parse(token).accessToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoggedInUser(localStorage.getItem("username"));
          } else {
            console.log("else");
            setLoggedInUser("");
          }
        });
    } catch (error) {
      console.log("catch");
      console.log(error);
    }
  });
  return (
    <>
      <div className="sideBar">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Scrum</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/projects">Projects</Nav.Link>
                <NavDropdown
                  title={loggedInUser || "Please log in"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    href="#"
                    style={{ display: loggedInUser ? "none" : "block" }}
                    id="loginBtn"
                    onClick={handleLoginClick}
                  >
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    style={{ display: loggedInUser ? "none" : "block" }}
                    id="registerBtn"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item
                    href="/"
                    style={{ display: loggedInUser ? "block" : "none" }}
                    onClick={logOut}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* 
        <nav>
          <ul id="ul-nb">
            <li>
              <NavLink id="homeBtn" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ display: loggedInUser ? "block" : "none" }}
                id="projectsBtn"
                to="/projects"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <button
                style={{ display: loggedInUser ? "none" : "block" }}
                id="loginBtn"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </li>
            <li>
              <button
                style={{ display: loggedInUser ? "none" : "block" }}
                id="registerBtn"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </li>
            <li>
              <p style={{ display: loggedInUser ? "block" : "none" }}>
                Logged in as: <b>{loggedInUser}</b>
              </p>
            </li>
          </ul>
        </nav> */}
      </div>
      <LoginForm
        isShowLogin={isShowLogin}
        setIsShowLogin={setIsShowLogin}
      ></LoginForm>
      <RegisterForm
        isShowRegister={isShowRegister}
        setIsShowRegister={setIsShowRegister}
      ></RegisterForm>
      <Routes>
        {/* Root path of our application. Inside element = whatever you want to render on that page */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/projectview/:projectID/:project_name"
          element={<ProjectView />}
        />
      </Routes>
    </>
  );
}

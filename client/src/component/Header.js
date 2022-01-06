import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="" className="mx-auto">
            <h1>Hangman</h1>
          </Navbar.Brand>
          <Nav
            className=""
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

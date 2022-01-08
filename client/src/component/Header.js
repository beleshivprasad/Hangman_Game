import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand className="mx-auto">
            <h1>
              <Link to="/" className="heading" >Hangman</Link>
            </h1>
          </Navbar.Brand>
          <Nav className="d-flex" style={{ maxHeight: "100px" }} navbarScroll>
            {/* <Nav.Link href="">Home</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

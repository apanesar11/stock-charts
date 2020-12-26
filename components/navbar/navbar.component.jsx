import React from "react";
import {Navbar} from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Stock Charts
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarComponent;

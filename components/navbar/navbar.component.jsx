import React from "react";
import {Navbar} from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar
      variant="dark"
      style={{
        backgroundColor: '#24292C'
      }}
    >
      <Navbar.Brand href="/">
        <img
          alt="logo"
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span className='ml-3'>Stock Charts</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarComponent;

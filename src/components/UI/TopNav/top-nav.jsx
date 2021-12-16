import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navbar, Button, Container } from "react-bootstrap";
import "./top-nav.scss";

const TopNav = (props) => {
  const { onLoggedOut } = props;
  const user = localStorage.getItem("user");

  return (
    <>
      <Navbar bsPrefix="my-navbar" sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"} className="preCodeBrand">
              Pre-Code Flix
            </Link>
          </Navbar.Brand>
          {user && (
            <Button variant="link" onClick={onLoggedOut.bind(this)}>
              <Link to={`/`}>Log Out</Link>
            </Button>
          )}
          {user && (
            <Button variant="link" >
              <Link to={`/users/${user}`}>View Profile</Link>
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

TopNav.propTypes = {
  onLoggedOut: PropTypes.func.isRequired
}

export default TopNav;

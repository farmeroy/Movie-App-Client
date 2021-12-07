import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import './login-view.scss';

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Col md={8}>
    <Form className="login-form">
      <Form.Group controlId="formUsername">
        <Form.Label><span className='label'>Username:</span></Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label><span className='label'>Password:</span></Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button sizevariant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>{' '}
      <Button variant="secondary" type="button" onClick={props.onRegisterUser}>
        New Account
      </Button>
    </Form>
    </Col>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func,
  onRegisterUser: PropTypes.func,
};

export default LoginView;

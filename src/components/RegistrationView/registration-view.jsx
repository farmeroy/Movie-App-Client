import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <Form>
      <Form.Group controlId="formUserName">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          onchange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          onChange={(event) => setBirthday(event.target.value)}
        />
      </Form.Group>

      <Button type="submit" onClick={() => console.log('clicked')}>Confirm</Button>
    </Form>
  );
}

RegistrationView.propTypes = {};
export default RegistrationView;

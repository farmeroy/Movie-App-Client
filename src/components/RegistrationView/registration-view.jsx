import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");


  const registerUserHandler = (event) => {
    event.preventDefault();
    const newUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: new Date(birthday)
    };
    console.log(newUser, typeof newUser.Birthday)

    axios.post('https://pre-code-flix.herokuapp.com/users', newUser )
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch( error => {
        console.log('error registering the user')
      });
  };

  return (
    <Col md={8}>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>
            <span className="label">Username:</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>
            <span className="label">Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            <span className="label">Email:</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>
            <span className="label">Birthday:</span>
          </Form.Label>
          <Form.Control
            type="date"
            onChange={(event) => setBirthday(event.target.value)}
          />
        </Form.Group>

        <Button type="submit" onClick={registerUserHandler}>
          Confirm
        </Button>
      </Form>
    </Col>
  );
}

RegistrationView.propTypes = {};
export default RegistrationView;

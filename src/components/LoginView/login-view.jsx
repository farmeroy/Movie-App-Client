import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {Button, Col, Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './login-view.scss';

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://pre-code-flix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => { 
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(event => {
        console.log('no such user')
      })
  };

  return (
    <Col md={8}>
    <Form className="login-form" >
      <Form.Group controlId="formUsername">
        <Form.Label><span className='label'>Username:</span></Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          placeholder='username'
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label><span className='label'>Password:</span></Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder='password'
        />
      </Form.Group>

      <Button sizevariant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>{' '}
      <Button variant="secondary" type="button" onClick={()=>{navigate('/registration')}}>
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

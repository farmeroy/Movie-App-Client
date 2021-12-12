import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";
import axios from 'axios';
import {Button, Col, Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './login-view.scss';

// validation logic to check input in text field
const textInputIsValid = (text) => {
  return text.trim() !== "";
}

function LoginView(props) {

  const navigate = useNavigate();

  const {
    enteredValue: enteredUsername,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    inputChangeHandler: usernameChangeHandler,
    inputTouchHandler: usernameTouchHandler
  } = useForm(textInputIsValid);

  const {
    enteredValue: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler
  } = useForm(textInputIsValid);

  const formIsValid = usernameIsValid && passwordIsValid;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    axios.post('https://pre-code-flix.herokuapp.com/login', {
      Username: enteredUsername,
      Password: enteredPassword
    })
      .then(response => { 
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(error => {
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
          value={enteredUsername}
          onChange={usernameChangeHandler}
          onBlur={usernameTouchHandler}
          placeholder='username'
        />       
        {usernameHasError && <p>Please enter your Username</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label><span className='label'>Password:</span></Form.Label>
        <Form.Control
          type="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
          onChange={passwordChangeHandler}
          placeholder='password'
        />
        {passwordHasError && <p>Please enter your Password</p>}
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import useForm from '../../hooks/useForm';
import { Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

// validation logic to check input in text field
const textInputIsValid = (text) => {
  return text.trim() !== "";
}

function RegistrationView(props) {

  const {
    enteredValue: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputTouchHandler: emailTouchHandler,
  } = useForm(textInputIsValid);

  const {
    enteredValue: enteredBirthday,
    hasError: birthdayHasError,
    isValid: birthdayIsValid,
    inputChangeHandler: birthdayChangeHandler,
    inputTouchHandler: birthdayTouchHandler
  } = useForm(textInputIsValid);

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

  const formIsValid = usernameIsValid && passwordIsValid && emailIsValid && birthdayIsValid;



  const registerUserHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      usernameTouchHandler();
      passwordTouchHandler();
      emailTouchHandler();
      birthdayTouchHandler();
      return;
    }
    const newUser = {
      Username: enteredUsername,
      Password: enteredPassword,
      Email: enteredEmail,
      Birthday: new Date(enteredBirthday)
    };

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
        <Form.Group controlId="formUsername">
          <Form.Label>
            <span className="label">Username:</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameTouchHandler}
            placeholder="username"
          />
          {usernameHasError && <p className="error">Please enter a Username</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>
            <span className="label">Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordTouchHandler}
            placeholder='password'
          />
          {passwordHasError && <p className="error">Please enter a password</p>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>
            <span className="label">Email:</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailTouchHandler}
          />
          {emailHasError && <p className="error">Please enter a valid email</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>
            <span className="label">Birthday:</span>
          </Form.Label>
          <Form.Control
            type="date"
            placeholder=''
            value={enteredBirthday}
            onBlur={birthdayTouchHandler}
            onChange={birthdayChangeHandler}
          />
          {birthdayHasError && <p className="error">Please enter your birthday</p>}
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

import { React, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from "axios";

// validation logic to check input in text field
const textInputIsValid = (text) => {
  return text.trim() !== "";
};

const UpdateUserForm = (props) => {
  const { userData, hideForm } = props;

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
    inputTouchHandler: birthdayTouchHandler,
  } = useForm(textInputIsValid);

  const {
    enteredValue: enteredUsername,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    inputChangeHandler: usernameChangeHandler,
    inputTouchHandler: usernameTouchHandler,
  } = useForm(textInputIsValid);

  const {
    enteredValue: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler,
  } = useForm(textInputIsValid);

  const formIsValid =
    usernameIsValid && passwordIsValid && emailIsValid && birthdayIsValid;

  const updateUserHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      usernameTouchHandler();
      passwordTouchHandler();
      emailTouchHandler();
      birthdayTouchHandler();
      return;
    }
    console.log("updated!");
  };

  return (
    <Row className="main-view justify-content-md-center row-eq-height">
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
            {usernameHasError && <p>Please enter a Username</p>}
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
              placeholder="password"
            />
            {passwordHasError && <p>Please enter a password</p>}
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
            {emailHasError && <p>Please enter a valid email</p>}
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>
              <span className="label">Birthday:</span>
            </Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              value={enteredBirthday}
              onBlur={birthdayTouchHandler}
              onChange={birthdayChangeHandler}
            />
            {birthdayHasError && <p>Please enter your birthday</p>}
          </Form.Group>

          <Button type="submit" onClick={updateUserHandler}>
            Confirm
          </Button>
          <Button type="button" onClick={hideForm}>
            Cancel
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateUserForm;

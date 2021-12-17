import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { setUserData } from "../../actions/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

// validation logic to check input in text field
const textInputIsValid = (text) => {
  return text.trim() !== "";
};

const emailInputIsValid = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const UpdateUserForm = (props) => {
  const { userData, hideForm } = props;

  const {
    enteredValue: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputTouchHandler: emailTouchHandler,
  } = useForm(emailInputIsValid);

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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const updatedUser = {
      Username: enteredUsername,
      Password: enteredPassword,
      Email: enteredEmail,
      Birthday: new Date(enteredBirthday),
    };
    axios
      .put(
        `https://pre-code-flix.herokuapp.com/users/${user}/update`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        localStorage.setItem("user", enteredUsername);
        props.setUserData(response.data);
        hideForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row className="update-user main-view justify-content-md-center row-eq-height">
      <Col md={12}>
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
              placeholder={userData.Username}
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
              placeholder="enter a new password"
            />
            {passwordHasError && <p>Please enter a password</p>}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>
              <span className="label">Email:</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={userData.Email}
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
              placeholder={userData.Birthday}
              value={enteredBirthday}
              onBlur={birthdayTouchHandler}
              onChange={birthdayChangeHandler}
            />
            {birthdayHasError && <p>Please enter your birthday</p>}
          </Form.Group>
          <Button type="button" variant="secondary" onClick={hideForm}>
            Cancel
          </Button>{" "}
          <Button type="submit" onClick={updateUserHandler}>
            Confirm
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

UpdateUserForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { setUserData })(UpdateUserForm);

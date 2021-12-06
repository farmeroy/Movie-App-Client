import React, { useState } from "react";
// import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );

  // return (
  //   <form>
  //     <label>
  //       Username:
  //       <input
  //         type="text"
  //         value={username}
  //         onChange={(event) => setUsername(event.target.value)}
  //       />
  //     </label>
  //     <label>
  //       Password:
  //       <input
  //         type="password"
  //         value={password}
  //         onChange={(event) => setPassword(event.target.value)}
  //       />
  //     </label>
  //     <button type="submit" onClick={handleSubmit}>
  //       Submit
  //     </button>
  //     <button type="button" onClick={props.onRegisterUser}>Register New Account</button>
  //   </form>
  // );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func,
  onRegisterUser: PropTypes.func,
};

export default LoginView;

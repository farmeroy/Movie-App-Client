import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={props.onRegisterUser}>Register New Account</button>
    </form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func,
  onRegisterUser: PropTypes.func
}

export default LoginView;

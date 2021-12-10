import { React, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const UpdateUserForm = (props) => {

  const {userData, hideForm} = props;
  const [username, setUsername] = useState(userData.Username);
  const [userEmail, setUserEmail] = useState(userData.Email);
  // set this to false to ensure the user enters a valid password -- this prefents our hashed password in the database from being used
  const [userPassword, setPassword] = useState(false);
  const [userBirthday, setUserBirthday] = useState(userData.Birthday);

  const updateUserHandler = (event) => {
    event.prevent.default;
  }

  return (
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
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>
            <span className="label">Birthday:</span>
          </Form.Label>
          <Form.Control
            type="date"
            onChange={(event) => setUserBirthday(event.target.value)}
          />
        </Form.Group>

        <Button type="submit" onClick={updateUserHandler}>
          Confirm
        </Button>
        <Button type="button" onClick={hideForm}>Cancel</Button>
      </Form>

  )
}

export default UpdateUserForm;

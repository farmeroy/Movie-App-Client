import { React, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import UpdateUserForm from "./update-user-form.jsx";
import "./user-profile-view.css";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

const UserInfo = (props) => {
  const { userData } = props;
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const deleteUserHandler = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .delete(`http://pre-code-flix.herokuapp.com/users/${user}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hideDeleteHandler = () => setShowDeleteUser(false);
  const showDeleteUserHandler = () => setShowDeleteUser(true);

  return (
    <Card bsPrefix="profile-card">
      <Card.Title bsPrefix="limelight">{userData.Username}</Card.Title>
      <Card.Text>{userData.Email}</Card.Text>
      {!showUpdateUserForm && (
        <Button
          onClick={() => {
            setShowUpdateUserForm(true);
          }}
        >
          Update Info
        </Button>
      )}
      {showUpdateUserForm && (
        <UpdateUserForm
          hideForm={() => {
            setShowUpdateUserForm(false);
          }}
        />
      )}
      <Button onClick={showDeleteUserHandler}>Delete Account</Button>
      <Modal show={showDeleteUser} onHide={hideDeleteHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This cannot be undone...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteHandler}>
            Cancel
          </Button>
          <Button onClick={deleteUserHandler}>Delete Account</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps)(UserInfo);

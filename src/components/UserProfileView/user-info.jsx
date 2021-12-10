import { React, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import UpdateUserForm from './update-user-form.jsx'; 

const UserInfo = (props) => {
  const { userData } = props;
  const [ showUpdateUserForm, setShowUpdateUserForm ] = useState(false);

  return (
    <Card>
      <Card.Title>{userData.Username}</Card.Title>
      <Card.Text>{userData.Email}</Card.Text>
      { !showUpdateUserForm &&
      <Button onClick={()=>{setShowUpdateUserForm(true)}}>Update Info</Button>
      }
      {showUpdateUserForm && <UpdateUserForm userData={userData} hideForm={ () => {setShowUpdateUserForm(false)}}/>}
    </Card>
  )
}

export default UserInfo;

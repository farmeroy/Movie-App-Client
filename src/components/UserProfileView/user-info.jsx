import { React } from 'react';
import { Button, Card } from 'react-bootstrap';

const UserInfo = (props) => {
  const { userData } = props;

  return (
    <Card>
      <Card.Title>{userData.Username}</Card.Title>
      <Card.Text>{userData.Email}</Card.Text>
      <Button>Update Info</Button>
    </Card>
  )
}

export default UserInfo;

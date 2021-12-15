import React from "react";
import FavMovies from "./fav-movies";
import UserInfo from "./user-info";
import { Col, Row } from "react-bootstrap";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {  userData: state.userData }
};



const ProfileView = (props) => {
  const { userData } = props;  

  if (!userData) return <div>Loading data</div>;

  if (userData)  return (
    <Row className="justify-content-center row-eq-height">
      <Col md={10}>
        <UserInfo userData={userData} />
      </Col>
      <Col md={10}>
        <Row className="justify-content-md-center row-eq-height">
        <FavMovies />
        </Row>
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps)(ProfileView);

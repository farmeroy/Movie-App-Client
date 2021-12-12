import { useEffect, React, useState } from "react";
import FavMovies from "./fav-movies";
import UserInfo from "./user-info";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

const ProfileView = (props) => {
  // const { moviesData } = props;
  const [userData, setUserData] = useState("");
  const moviesData = userData.FavMovies;
  const getUserData = (token) => {
    const user = localStorage.getItem("user");
    axios
      .get(`http://pre-code-flix.herokuapp.com/users/${user}`
      , {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      getUserData(accessToken);
    }
  }, []);

  if (!userData) return <div>Loading data</div>;

  if (userData)  return (
    <Row className="justify-content-center row-eq-height">
      <Col md={10}>
        <UserInfo userData={userData} />
      </Col>
      <Col md={10}>
        <Row className="justify-content-md-center row-eq-height">
        <FavMovies userData={userData} moviesData={moviesData} />
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileView;

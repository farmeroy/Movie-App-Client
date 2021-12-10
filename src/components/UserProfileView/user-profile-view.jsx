import { useEffect, React, useState } from "react";
import FavMovies from "./fav-movies";
import UserInfo from "./user-info";
import { Row } from "react-bootstrap";
import axios from "axios";

const ProfileView = (props) => {
  const { moviesData } = props;
  const [userData, setUserData] = useState("");

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
    <>
      <Row>
        <UserInfo userData={userData} />
      </Row>
      <Row>
        <FavMovies userData={userData} moviesData={moviesData} />
      </Row>
    </>
  );
};

export default ProfileView;

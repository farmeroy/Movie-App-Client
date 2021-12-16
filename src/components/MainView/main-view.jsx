import { useState, useEffect, React } from "react";
import { Route, Routes } from "react-router-dom";
import "./main-view.scss";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import LoginView from "../LoginView/login-view";
import MovieView from "../MovieView/movie-view.jsx";
import Movies from "../Movies/movies.jsx";
import RegistrationView from "../RegistrationView/registration-view";
import DirectorView from "../DirectorView/director-view";
import GenreView from "../GenreView/genre-view";
import ProfileView from "../UserProfileView/user-profile-view";
import TopNav from "../UI/TopNav/top-nav";
import { Row } from "react-bootstrap";
import { setMovies, setUserData, setFavMovies } from "../../actions/actions";

const MainView = (props) => {

  [user, setUser] = useState("");

  const { movies, userData } = props;

  const getMovies = (token) => {
    axios
      .get("http://pre-code-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  const getUserData = (token) => {
    const user = localStorage.getItem("user");
    axios
      .get(`http://pre-code-flix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setUserData(response.data);
        props.setFavMovies(response.data.FavMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoggedIn = (authData) => {
    setUser(authData.user.Username);
    const token = authData.token;
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    getMovies(token);
    getUserData(token);
  };

  const onLoggedOut = () => {
    setUser('');
    props.setMovies('');
    props.setFavMovies('');
    props.setUserData('');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setUser(localStorage.getItem("user"));
      getMovies(accessToken);
      getUserData(accessToken);
    }
  }, [user]);

  const dataIsLoaded = movies && userData;

  return (
    <>
      <TopNav onLoggedOut={onLoggedOut} />
      <Row className="main-view justify-content-md-center row-eq-height">
        <Routes>
          {/* placeholder while the movies fetch*/}
          {user && !dataIsLoaded && (
            <Route path="/" element={<div className="main-view">Loading data please wait...</div>} />
          )}
          {user && <Route path="/" element={<Movies />} />}
          {!user && (
            <Route path="/" element={<LoginView onLoggedIn={onLoggedIn} />} />
          )}
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/movies/:movieId" element={<MovieView />} />

          <Route path="/genres/:name" element={<GenreView />} />
          <Route path="/directors/:name" element={<DirectorView />} />
          <Route path={`/users/:name`} element={<ProfileView />} />
        </Routes>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return { movies: state.movies, userData: state.userData, favMovies: state.favMovies };
};

MainView.propTypes = {
  movies: PropTypes.any,
  userData: PropTypes.any
}

export default connect(mapStateToProps, { setFavMovies, setMovies, setUserData })(MainView);

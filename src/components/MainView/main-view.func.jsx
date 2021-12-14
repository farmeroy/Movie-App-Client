import { useState, useEffect, React } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./main-view.scss";
import axios from "axios";
import { connect } from 'react-redux';
import LoginView from "../LoginView/login-view";
import MovieView from "../MovieView/movie-view-func.jsx";
import Movies from "../Movies/movies.jsx";
import RegistrationView from "../RegistrationView/registration-view";
import DirectorView from "../DirectorView/director-view";
import GenreView from "../GenreView/genre-view";
import ProfileView from "../UserProfileView/user-profile-view";
import TopNav from "../UI/TopNav/top-nav";
import {  Row } from "react-bootstrap";
import { setMovies } from '../../actions/actions';

const MainView = (props) => {
  [selectedMovie, setSelectedMovie] = useState("");
  [user, setUser] = useState("");
  [registerUser, setRegisterUser] = useState("");
  [userData, setUserData] = useState("");
  const { movies } = props;

  const getMovies = (token) => {
    axios
      .get("http://pre-code-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onLoggedIn = (authData) => {
    setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    setUserData(authData.user);
  };

  const onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setUser(localStorage.getItem("user"));
      getMovies(accessToken);
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
            <Route path="/" element={<div className="main-view"></div>} />
          )}
          {user && (
            <Route
              path="/"
              element={<Movies moviesData={movies} userData={userData} />}
            />
          )}
          {!user && (
            <Route path="/" element={<LoginView onLoggedIn={onLoggedIn} />} />
          )}
          <Route path="/registration" element={<RegistrationView />} />
          <Route
            path="/movies/:movieId"
            element={
              <MovieView
                movies={movies}
                onBackClick={() => console.log("go back")}
                userData={userData}
              />
            }
          />

          <Route
            path="/genres/:name"
            element={<GenreView movies={movies} userData={userData} />}
          />
          <Route
            path="/directors/:name"
            element={<DirectorView movies={movies} userData={userData} />}
          />
          <Route path={`/users/${user}`} element={<ProfileView />} />
        </Routes>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return { movies: state.movies }
};

export default connect(mapStateToProps, { setMovies })(MainView);

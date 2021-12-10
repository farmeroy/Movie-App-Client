import { useState, useEffect, React } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./main-view.scss";
import axios from "axios";
import LoginView from "../LoginView/login-view";
import MovieView from "../MovieView/movie-view-func.jsx";
import Movies from "../Movies/movies.jsx";
import RegistrationView from "../RegistrationView/registration-view";
import DirectorView from "../DirectorView/director-view";
import GenreView from "../GenreView/genre-view";
import ProfileView from "../UserProfileView/user-profile-view";

import { Button, Container, Row, Navbar } from "react-bootstrap";

const MainView = () => {
  [selectedMovie, setSelectedMovie] = useState("");
  [movies, setMovies] = useState("");
  [user, setUser] = useState("");
  [registerUser, setRegisterUser] = useState("");
  [userData, setUserData] = useState("");

  const getMovies = (token) => {
    axios
      .get("http://pre-code-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
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
    console.log(authData.user);
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
  }, []);

  const dataIsLoaded = movies && userData;

  return (
    <>
      <Navbar bsPrefix="my-navbar" sticky="top">
        <Container fluid>
          <Navbar.Brand className="preCodeBrand">Pre-Code Flix</Navbar.Brand>
          <Button onClick={onLoggedOut.bind(this)}><Link to={`/`}>Log Out</Link></Button>
          <Button className="preCodeBrand">
            <Link to={`/users/${user}`}>View Profile</Link>
          </Button>
        </Container>
      </Navbar>

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
              />
            }
          />

          <Route path="/genres/:name" element={<GenreView movies={movies} />} />
          <Route
            path="/directors/:name"
            element={<DirectorView movies={movies} />}
          />
          <Route
            path={`/users/${user}`}
            element={<ProfileView moviesData={movies}  />}
          />
        </Routes>
      </Row>
    </>
  );
};

export default MainView;

import { useState, useEffect, React } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./main-view.scss";
import axios from "axios";
import LoginView from "../LoginView/login-view";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";
import RegistrationView from "../RegistrationView/registration-view";
import { Button, Container, Row, Col, Navbar } from "react-bootstrap";

const MainView = (props) => {
  [selectedMovie, setSelectedMovie] = useState("");
  [movies, setMovies] = useState("");
  [user, setUser] = useState("");
  [registerUser, setRegisterUser] = useState("");

  const params = useParams();

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
    getMovies(authData.token);
  };

  const onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const onRegisterUserHandler = () => {
    const showRegisterUser = !registerUser;
    setRegisterUser(showRegisterUser);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setUser(localStorage.getItem("user"));
      getMovies(accessToken);
    }
  }, []);

  if (!user && !registerUser)
    return (
      <LoginView
        onLoggedIn={(user) => onLoggedIn(user)}
        onRegisterUser={() => onRegisterUserHandler()}
      />
    );

  if (!user && registerUser) return <RegistrationView />;

  if (!movies.length) return <div className="main-view"></div>;

  const movieCards = movies.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard
        key={movie._id}
        movieData={movie}
        // onMovieClick={(movie) => {
        //   this.setSelectedMovie(movie);
        // }}
      />
    </Col>
  ));

  return (
    <Router>
      <Navbar bsPrefix="my-navbar" sticky="top">
        <Container fluid>
          <Navbar.Brand className="preCodeBrand">Pre-Code Flix</Navbar.Brand>
          <Button onClick={onLoggedOut.bind(this)}>Log Out</Button>
        </Container>
      </Navbar>

      <Row className="main-view justify-content-md-center row-eq-height">
        <Routes>
          <Route exact path="/" element={movieCards} />

          <Route
            path="/movies/:movieId"
            element={
              <Col lg={10}>
                <MovieView
                  movie={params.movieId}
                  onBackClick={() => console.log("poop")}
                />
              </Col>
            }
          />

          <Route exact patch="/genres/:name" />

          <Route exact patch="/directors/:name" />
        </Routes>
      </Row>
    </Router>
  );
};

export default MainView;

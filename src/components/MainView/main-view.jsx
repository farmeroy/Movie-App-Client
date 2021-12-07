import React from "react";
import './main-view.scss';
import axios from "axios";
import LoginView from "../LoginView/login-view";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";
import RegistrationView from "../RegistrationView/registration-view";
import { Container, Row, Col, Navbar } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      movies: [],
      user: null,
      registerUser: false,
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    axios
      .get("http://pre-code-flix.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegisterUserHandler() {
    const showRegisterUser = !this.state.registerUser;
    this.setState({
      registerUser: showRegisterUser,
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  render() {
    const { movies, selectedMovie, user, registerUser } = this.state;

    if (!user && !registerUser)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegisterUser={() => this.onRegisterUserHandler()}
        />
      );

    if (!user && registerUser) return <RegistrationView />;

    if (!movies.length) return <div className="main-view"></div>;

    return (
      <>
        <Navbar bg="light" sticky="top" >
          <Container fluid>
            <Navbar.Brand className="preCodeBrand">Pre-Code Flix</Navbar.Brand>
          </Container>
        </Navbar>
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col lg={10}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => this.setSelectedMovie(null)}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col  sm={6} md={4} lg={3} className='movie-column'>
                <MovieCard
                  key={movie._id}
                  movieData={movie}
                  onMovieClick={(movie) => {
                    this.setSelectedMovie(movie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </>
    );
  }
}

export default MainView;

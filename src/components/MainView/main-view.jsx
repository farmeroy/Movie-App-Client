import React from "react";
import axios from "axios";
import LoginView from "../LoginView/login-view";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";
import RegistrationView from "../RegistrationView/registration-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    axios
      .get("http://pre-code-flix.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
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
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => this.setSelectedMovie(null)}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
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
    );
  }
}

export default MainView;

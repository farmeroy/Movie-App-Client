import React from "react";
import './main-view.scss';
import axios from "axios";
import LoginView from "../LoginView/login-view";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";
import RegistrationView from "../RegistrationView/registration-view";
import { Button, Container, Row, Col, Navbar } from "react-bootstrap";

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
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegisterUserHandler() {
    const showRegisterUser = !this.state.registerUser;
    this.setState({
      registerUser: showRegisterUser,
    });
  }

  getMovies(token) {
    axios.get("http://pre-code-flix.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
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

    const movieCards =  movies.map((movie) => (
               <Col  sm={6} md={4} lg={3} className='movie-column' key={movie._id}>
                <MovieCard
                  key={movie._id}
                  movieData={movie}
                  onMovieClick={(movie) => {
                    this.setSelectedMovie(movie);
                  }}
                />
              </Col>
            ));

    return (
      <>
        <Navbar bsPrefix="my-navbar" sticky="top" >
          <Container fluid>
            <Navbar.Brand className="preCodeBrand">Pre-Code Flix</Navbar.Brand>
            <Button onClick={this.onLoggedOut.bind(this)}>Log Out</Button>
          </Container>
        </Navbar>
        <Row className="main-view justify-content-md-center row-eq-height">
          {selectedMovie && 
            <Col lg={10}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => this.setSelectedMovie(null)}
              />
            </Col>
          }
          {!selectedMovie && movieCards}
        </Row>
      </>
    );
  }
}

export default MainView;

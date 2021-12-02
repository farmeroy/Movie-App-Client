import React from "react";
import axios from "axios";

import LoginView from "../LoginView/login-view";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      movies: [],
      user: null
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
      user
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />;

    if (!movies.length)
      return <div className="main-view"></div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={() => this.setSelectedMovie(null)}
          />
        ) : (
          movies.map((movie) => {
            return (
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default MainView;

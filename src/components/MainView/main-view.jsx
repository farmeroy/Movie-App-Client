import React from "react";
import MovieCard from "../MovieCard/movie-card";
import MovieView from "../MovieView/movie-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      movies: [
        {
          _id: 1,
          Title: "M",
          Description: "A child murderer is loose in Berlin...",
          Director: "Fritz Lang",
          Genre: "Thriller",
          ImagePath: "./img/M_poster.jpg",
        },
        {
          _id: 2,
          Title: "Duck Soup",
          Director: "Leo McCarey",
          Description:
            "A case of mistaken identity leads Groucho to become the ruler of a small country...",
          Genre: "Comedy",
          ImagePath: "./img/duck-soup_poster.jpg",
        },
        {
          _id: 3,
          Title: "Freaks",
          Director: "Tod Browning",          
          Description:
            "A circus sideshow heir is tempted by a beatutiful trapeze artist, who is only after his fortune...",
          Genre: "Thriller",
          ImagePath: "./img/freaks_poster.jpg",
        },
      ],
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (!movies.length)
      return <div className="main-view">The list is empty!</div>;

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

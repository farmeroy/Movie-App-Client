import React from "react";
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card"  onClick={ () => { onMovieClick(movieData); }} >{movieData.Title}</div>; }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;

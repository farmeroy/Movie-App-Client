import React from "react";
import PropTypes from 'prop-types';

class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        {/* <div className="movie-poster"> */}
        {/*   <img src={movie.ImagePath} /> */}
        {/* </div> */}
        <div className="movie-title">
          <span className="label">Title:</span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director:</span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description:</span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default MovieView;


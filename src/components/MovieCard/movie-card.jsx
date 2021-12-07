import React from "react";
import './movie-card.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



class MovieCard extends React.Component {

  // method to ensure consistent text length and card height
  truncateText(text) {
    if (!text) {
      return '...'
    }
    if (text.length > 120) {
      let newText = text.slice(0, 117);
      newText += '...';
      console.log(newText)
      return newText;
    } 
    return text;
  }


  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className='movie-card'>
        <Card.Img variant="top" className="poster" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title className='limelight'>{movieData.Title}</Card.Title>
          <Card.Text>{this.truncateText(movieData.Description)}</Card.Text>
          <Button onClick={ () =>  onMovieClick(movieData)} variant="link">Open</Button>
          </Card.Body>
      </Card>
    );
  }
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

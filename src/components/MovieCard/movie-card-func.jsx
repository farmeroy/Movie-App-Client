import React from "react";
import "./movie-card.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';

const truncateText = (text) => {
  if (!text) {
    return "...";
  }
  if (text.length > 120) {
    let newText = text.slice(0, 117);
    newText += "...";
    return newText;
  }
  return text;
};

const MovieCard = (props) => {
  const { movieData, onMovieClick } = props;
  const navigate = useNavigate();
  const movieId = movieData._id;

  return (
    <Card bsPrefix="movie-card">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body>
        <Card.Title bsPrefix="limelight">{movieData.Title}</Card.Title>
        <Card.Text>{truncateText(movieData.Description)}</Card.Text>
        <Button onClick={() => navigate(`/movies/${movieId}`)} variant="link-dark">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

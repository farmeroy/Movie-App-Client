import React from "react";
import MovieCard from "../MovieCard/movie-card.jsx";
import { Col } from "react-bootstrap";

const Movies = (props) => {
  const { moviesData, userData } = props;

  const movieCards = moviesData.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard key={movie._id} movieData={movie} userData={userData}/>
    </Col>
  ));

  return <>{movieCards}</>;
};

export default Movies;

import React from 'react';
import MovieCard from '../MovieCard/movie-card-func';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const Movies = (props) => {

  const { moviesData, user } = props;
 console.log(moviesData, user)
  const navigate = useNavigate();
 const movieCards = moviesData.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard
        key={movie._id}
        movieData={movie}
      />
    </Col>
  ));

  return (
  <>
    {movieCards}
  </>)

}

export default Movies;

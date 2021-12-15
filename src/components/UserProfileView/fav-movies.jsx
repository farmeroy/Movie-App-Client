import React from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/movie-card.jsx";
import VisibilityFilterInput from "../VisibilityFilterInput/visibility-filter-input";
import { Col } from "react-bootstrap";

const mapStateToProps = (state) => {
  const { visibilityFilter, userData, movies} = state;
  return { visibilityFilter, userData, movies};
};

const FavMovies = (props) => {
  const { userData, visibilityFilter, movies } = props;
  let favMovies = []; 
  movies.forEach((movie) => {
    if (userData.FavMovies.find((favMovie) => favMovie._id === movie._id)) {
      favMovies.push(movie)
    }
  })

  let filteredMovies = favMovies; 

  if (visibilityFilter !== "") {
    filteredMovies = favMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!userData) return <div className="main-view" />;

  const movieCards = filteredMovies.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard key={movie._id} movieData={movie} userData={userData} />
    </Col>
  ));

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {movieCards}
    </>
  );
};

export default connect(mapStateToProps)(FavMovies);


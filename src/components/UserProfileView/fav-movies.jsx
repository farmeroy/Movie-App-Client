import React from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/movie-card.jsx";
import VisibilityFilterInput from "../VisibilityFilterInput/visibility-filter-input";
import { Col } from "react-bootstrap";

const mapStateToProps = (state) => {
  const { visibilityFilter, favMovies, movies } = state;
  return { visibilityFilter, favMovies, movies };
};

const FavMovies = (props) => {
  const {  visibilityFilter, favMovies, movies } = props;

  let filteredMovies = movies.filter(movie => favMovies.includes(movie._id)); 

  if (visibilityFilter !== "") {
    filteredMovies = favMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  // if (!userData) return <div className="main-view" />;
 
  const movieCards = filteredMovies.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard key={movie._id} movieData={movie}  />
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


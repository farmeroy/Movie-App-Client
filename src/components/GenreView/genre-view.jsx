import { React } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import MovieCard from "../MovieCard/movie-card.jsx";
import { Row, Card, Col, Button } from "react-bootstrap";
import "./genre-view.scss";

const mapStateToProps = (state) => {
  const { movies, userData } = state;
  return { movies, userData };
};

const GenreView = (props) => {
  const { movies, userData } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const genre = movies.find((movie) => movie.Genre.Name === name).Genre;

  const genreMovies = movies.filter((movie) => movie.Genre.Name === name);

  const movieCards = genreMovies.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard key={movie._id} movieData={movie} userData={userData} />
    </Col>
  ));

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card bsPrefix="genre-card">
            <Card.Title bsPrefix="limelight">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              className="back-btn"
            >
              Back
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h1 className="other-films limelight">Other {genre.Name} Movies</h1>
        </Col>
      </Row>
      <Row className="main-view justify-content-md-center row-eq-height">
        {movieCards}
      </Row>
    </>
  );
};

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(GenreView);

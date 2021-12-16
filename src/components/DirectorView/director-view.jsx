import { React } from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/movie-card.jsx";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";
import "./director-view.scss";

const mapStateToProps = (state) => {
  const { movies, userData } = state;
  return { movies, userData };
};

const DirectorView = (props) => {
  const { userData, movies } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const director = movies.find(
    (movie) => movie.Director.Name === name
  ).Director;

  const directorMovies = movies.filter((movie) => movie.Director.Name === name);

  const movieCards = directorMovies.map((movie) => (
    <Col sm={6} md={4} lg={3} className="movie-column" key={movie._id}>
      <MovieCard key={movie._id} movieData={movie} userData={userData} />
    </Col>
  ));

  return (
    <>
      <Row>
        <Card bsPrefix="director-card">
          <Card.Title bsPrefix="limelight">{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="back-btn"
          >
            Back
          </Button>
        </Card>
      </Row>
      <Row>
        <Col sm={12}>
          <h1 className="limelight other-films">
            Other Films by {director.Name}
          </h1>
        </Col>
      </Row>
      <Row>{movieCards}</Row>
    </>
  );
};

DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DirectorView);

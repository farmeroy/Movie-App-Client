import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Card, ListGroup } from "react-bootstrap";
import "./movie-view.scss";

const mapStateToProps = state => {
  return { movies: state.movies, userData: state.userData }
};

const MovieView = (props) => {
  const { movieId } = useParams();
  const { movies } = props;
  const navigate = useNavigate();

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Col lg={10}>
      <Row className="movie-view">
        <Col sm={12} md={6} className="movie-poster">
          <Image src={movie.ImagePath} fluid />
        </Col>
        <Col sm={12} md={6}>
          <Card bsPrefix="movie-info">
            <ListGroup variant="flush">
              <ListGroup.Item className="movie-info">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </ListGroup.Item>
              <ListGroup.Item className="movie-info">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </ListGroup.Item>
              <ListGroup.Item className="movie-info">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </ListGroup.Item>
              <Button onClick={() => { navigate(-1) }} className="back-btn">
                Back
              </Button>
              <Button onClick={() => { navigate(`/directors/${movie.Director.Name}`) }}>
                Director
                </Button>
              <Button onClick={() => { navigate(`/genres/${movie.Genre.Name}`) }}>
                Genre
                </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(MovieView);

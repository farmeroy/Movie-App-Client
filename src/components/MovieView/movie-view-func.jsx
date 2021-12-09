import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Card, ListGroup } from "react-bootstrap";
import "./movie-view.scss";

const MovieView = (props) => {
  const { movieId } = useParams();
  const { movies, onBackClick } = props;
  const navigate = useNavigate();

  console.log( movieId )
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
              <Button onClick={() => { navigate('/') }} className="back-btn">
                Back
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default MovieView;

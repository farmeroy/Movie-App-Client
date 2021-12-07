import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Image, Card, ListGroup } from "react-bootstrap";
import './movie-view.scss';

class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
        <Row className="movie-view"> 
        <Col sm={12} md={6} className="movie-poster">
          <Image src={movie.ImagePath} fluid />
        </Col>
        <Col sm={12} md={6} >
          <Card bsPrefix='movie-info'>
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
              <Button onClick={onBackClick} className="back-btn">Back</Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;

import { React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Movies from "../Movies/movies.jsx";
import { Row, Card, Col, Button } from "react-bootstrap";
import './genre-view.scss';

const GenreView = (props) => {
  const { movies, userData } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const genre = movies.find((movie) => movie.Genre.Name === name).Genre;

  const genreMovies = movies.filter(movie => movie.Genre.Name === name);

  return (
    <>
      <Row>
        <Col sm={12}>
        <Card bsPrefix="genre-card">
          <Card.Title bsPrefix="limelight">{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
          <Button
            onClick={() => {
              navigate("/");
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
        <Movies moviesData={genreMovies} userData={userData} />
      </Row>
    </>
  );
};

export default GenreView;

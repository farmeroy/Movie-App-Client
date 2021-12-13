import { React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Movies from "../Movies/movies.jsx";
import { Row, Card, Col, Button } from "react-bootstrap";

const GenreView = (props) => {
  const { movies, userData } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const genre = movies.find((movie) => movie.Genre.Name === name).Genre;

  const genreMovies = movies.filter(movie => movie.Genre.Name === name);

  return (
    <>
      <Row>
        <Card>
          <Card.Title>{genre.Name}</Card.Title>
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
      </Row>
      <Row>
        <h1>Other {genre.Name} Movies</h1>
        </Row>
      <Row>
        <Movies moviesData={genreMovies} userData={userData} />
      </Row>
    </>
  );
};

export default GenreView;

import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Card, Col, Button } from "react-bootstrap";

const GenreView = (props) => {
  const { movies } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const genre = movies.find( movie => movie.Genre.Name === name ).Genre;

  return (

    <Row>
      <Card>
        <Card.Title>{genre.Name}</Card.Title>
        <Card.Text>{genre.Bio}</Card.Text>
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
  );
}


export default GenreView;

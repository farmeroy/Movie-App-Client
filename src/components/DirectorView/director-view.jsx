import { React } from "react";
import Movies from "../Movies/movies";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";

const DirectorView = (props) => {
  const { userData, movies } = props;
  const { name } = useParams();
  const navigate = useNavigate();

  const director = movies.find(
    (movie) => movie.Director.Name === name
  ).Director;
  
  const directorMovies = movies.filter(
    (movie) => movie.Director.Name === name
  );

  return (
    <>
    <Row>
      <Card>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Text>{director.Bio}</Card.Text>
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
      <Movies moviesData={directorMovies} userData={userData} /> 
    </Row>
    </>
  );
};

export default DirectorView;

import React, { useState } from "react";
import { connect } from 'react-redux';
import "./movie-card.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  addFavMovie, removeFavMovie } from "../../actions/actions";


const mapStateToProps = (state) => {
  return { favMovies: state.favMovies };
};


const truncateText = (text) => {
  if (!text) {
    return "...";
  }
  if (text.length > 120) {
    let newText = text.slice(0, 117);
    newText += "...";
    return newText;
  }
  return text;
};

const MovieCard = (props) => {
  const { movieData, favMovies } = props;
  const [ buttonLoading, setButtonLoading ] = useState(false);
  const navigate = useNavigate();
  const movieId = movieData._id;

  if (!favMovies) return <div>loading</div>;

  const isUserFav = favMovies.includes(movieId);

  const removeFavHandler = () => {
    const username = localStorage.getItem("user");
    const movieId = movieData._id;
    const token = localStorage.getItem("token");
    setButtonLoading(true);
    axios
      .put(
        `https://pre-code-flix.herokuapp.com/users/${username}/movies/remove/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "PUT",
        }
      )
      .then((response) => {
        console.log(response);
        setButtonLoading(false)
        props.removeFavMovie(movieId);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoading(false);
      });
  };

  const addFavHandler = () => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const movieId = movieData._id;
    setButtonLoading(true);
    axios
      .put(
        `https://pre-code-flix.herokuapp.com/users/${username}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        props.addFavMovie(movieId)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setButtonLoading(false);
      });
  };

  return (
    <Card bsPrefix="movie-card">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body bsPrefix="card-body">
        <Card.Title bsPrefix="limelight">{movieData.Title}</Card.Title>
        <Card.Text bsPrefix="card-text">{truncateText(movieData.Description)}</Card.Text>
              </Card.Body>
<Card.Footer bsPrefix="card-footer" >
        <Button
          onClick={() => navigate(`/movies/${movieId}`)}
          variant="link-dark"
        >
          Open
        </Button>
        {isUserFav && <Button disabled={buttonLoading} onClick={removeFavHandler}>{buttonLoading ? 'Loading... ': 'Unlike'}</Button>}
        {!isUserFav && <Button disabled={buttonLoading} onClick={addFavHandler}>{buttonLoading ? 'Loading... ': 'Like'}</Button>}
      </Card.Footer>

    </Card>
  );
};

MovieCard.propTypes = {
  favMovies: PropTypes.any.isRequired
}

export default connect(mapStateToProps, { addFavMovie, removeFavMovie })(MovieCard);

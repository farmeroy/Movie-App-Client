import { React } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DirectorView = (props) => {
  const { movies } = props;
  const { name } = useParams();
  console.log("movies:", movies);
  const directorData = movies.find(
    (movie) => movie.Director.Name === name
  ).Director;
  console.log("director", directorData);
  return <p>{directorData.Name}</p>;
};

export default DirectorView;

import { React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GenreView = (props) => {
  const { movies } = props;
  const { name } = useParams();
  const genreData = movies.find( movie => movie.Genre.Name === name ).Genre;
  console.log(genreData)
  return (
    <p>{genreData.Name}</p>
  )
}

export default GenreView;

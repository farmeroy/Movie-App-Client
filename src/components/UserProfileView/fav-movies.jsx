import { React } from 'react';
import Movies from '../Movies/movies';


const FavMovies = (props) => {
  const { userData, moviesData } = props;
  const userFavMovies = [];

  userData.FavMovies.forEach( (userMovie) => {
    userFavMovies.push(moviesData.find(movie => movie._id === userMovie._id))
  });
  
  return <Movies moviesData={userFavMovies} userData={userData}/>
}

export default FavMovies;

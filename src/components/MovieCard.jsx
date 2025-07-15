import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { useMovieContext } from '../contexts/MovieContext';
import "../css/MovieCard.css"; // Assuming you have a CSS file for styling
function MovieCard({movie}){
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();     
    const isFav = isFavorite(movie.id);
    function onFavouriteClick(e){
        e.preventDefault()
        if (isFav) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }


  return (
    <div className="movie-card">
     <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
            <button className={`favorite-btn ${isFav ? "active" : ""}`} onClick={onFavouriteClick}>
             <HeartOutlined />
            </button>
        </div>
      </div>  
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>  
    </div>
  )
}

export default MovieCard
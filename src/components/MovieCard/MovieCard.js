import React, { useContext } from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

function MovieCard({ movie, name }) {
    const placeholderText = 'No image found';
    const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);


    let storedMovie = watchlist.find((o) => o.id === movie.id);
    const watchlistDisabled = !!storedMovie;

    return (
        <div className="movie-card-container">
            <li className="movie-card" key={movie.id}>
                {movie.poster_path ? (
                    <Link to={`/movies/${movie.id}`} className="movie-card-link">
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                    />
                    </Link>
                ) : (
                    <Link to={`/movies/${movie.id}`} className="movie-card-link">
                    <div className="movie-placeholder">
                        <p className="movie-placeholder-text">{placeholderText}</p>
                    </div>
                    </Link>
                )}
                <div className="title-rating-container">
                    <h3 className="movie-title">{name}</h3>
                    <p className="movie-rating">{movie.vote_average.toFixed(1)}</p>
                    <button type="button" onClick={() => addMovieToWatchlist(movie)} disabled={watchlistDisabled}>Add to watchlist</button>
                </div>
            </li>
        </div>

    );
}

export default MovieCard;

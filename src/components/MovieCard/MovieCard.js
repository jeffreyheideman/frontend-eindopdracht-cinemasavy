import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';

function MovieCard({ movie, name }) {
    const placeholderText = 'No image found';

    return (
        <Link to={`/movies/${movie.id}`} className="movie-card-link">
            <li className="movie-card" key={movie.id}>
                {movie.poster_path ? (
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                    />
                ) : (
                    <div className="movie-placeholder">
                        <p className="movie-placeholder-text">{placeholderText}</p>
                    </div>
                )}
                <div className="title-rating-container">
                    <h3 className="movie-title">{name}</h3>
                    <p className="movie-rating">{movie.vote_average.toFixed(1)}</p>
                </div>
            </li>
        </Link>
    );
}

export default MovieCard;

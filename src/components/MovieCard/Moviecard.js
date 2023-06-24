import React from 'react';

function MovieCard({ movie }) {
    return (
        <li className="movie-card" key={movie.id}>
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
            />
            <div>
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-rating">{movie.vote_average.toFixed(1)}</p>
            </div>
        </li>
    );
}

export default MovieCard;
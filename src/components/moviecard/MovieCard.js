import React, { useContext } from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import Button from "../button/Button";
import { AuthContext} from "../../context/AuthContext";

function MovieCard({ movie, name, type }) {
    const { isAuth } = useContext(AuthContext);

    const placeholderText = 'No image found';
    const { addMovieToWatchlist, watchlist, removeMovieFromWatchlist } = useContext(GlobalContext);

    let storedMovie = watchlist.find((o) => o.id === movie.id);
    const watchlistDisabled = !!storedMovie;
    const removeButtonDisabled = !watchlistDisabled;

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
                    {isAuth ? (
                        <>
                            <Button
                                buttonName="+"
                                onClick={() => addMovieToWatchlist(movie)}
                                type="button"
                                className="movie-card-btn"
                                disabled={watchlistDisabled}
                            />
                            <Button
                                buttonName="-"
                                onClick={() => removeMovieFromWatchlist(movie.id)}
                                type="button"
                                className="movie-card-btn"
                                disabled={removeButtonDisabled}
                            />
                        </>
                    ) : null}
                </div>
            </li>
        </div>
    );
}

export default MovieCard;

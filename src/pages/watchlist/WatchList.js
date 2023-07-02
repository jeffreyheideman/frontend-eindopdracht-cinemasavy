import React, {useContext} from 'react';
import {GlobalContext} from "../../context/GlobalState";
import MovieCard from "../../components/moviecard/MovieCard";
import './WatchList.css';

const WatchList = () => {
    const {watchlist} = useContext(GlobalContext);

    return (
        <main className="watchlist-main">
            <h1 className="watchlist-title">My Watchlist</h1>
            {watchlist.length > 0 ? (
                <div className="watchlist-container">
                    {watchlist.map((movie) => (
                        <MovieCard movie={movie} name={movie.title} type="watchlist"/>
                    ))}
                </div>
            ) : (
                <h2>No movies in your list, Add some!</h2>
            )}

        </main>
    )};

export default WatchList;
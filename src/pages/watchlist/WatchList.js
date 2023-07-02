import React from 'react';
import {GlobalContext} from "../../context/GlobalState";
import MovieCard from "../../components/MovieCard/MovieCard";
import './WatchList.css';

const WatchList = () => {
    const {watchlist} = React.useContext(GlobalContext);
    return (
        <main className="watchlist-main">
            <h1 className="watchlist-title">My Watchlist</h1>
        <div className="watchlist-container">
            {watchlist.map((movie) => (
                <MovieCard movie={movie} name={movie.name} />
            ))}
        </div>
        </main>
    )};

export default WatchList;
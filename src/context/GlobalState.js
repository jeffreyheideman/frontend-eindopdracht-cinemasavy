import React, { createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    }, [state]);

    const addMovieToWatchlist = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addMovieToWatchlist,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

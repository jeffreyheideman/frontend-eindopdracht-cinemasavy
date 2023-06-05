import React from 'react';
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <>
        <div className="navigation-outer-wrapper">
            <input className="search-bar" type="text" placeholder="search..."/>
            <nav className="nav-element">
                <ul className="nav-bar">
                    <li className="nav-item">My Watchlist</li>
                    <li className="nav-item">Movies</li>
                    <li className="nav-item">TV Shows</li>
                    <li className="nav-item">Actors</li>
                    <li className="nav-item">Login/Sign up</li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default NavigationBar;
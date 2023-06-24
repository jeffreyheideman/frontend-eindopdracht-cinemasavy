import React from 'react';
import "./NavigationBar.css";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return (
        <>
        <div className="navigation-outer-wrapper">
            <input className="search-bar" type="text" placeholder="search..."/>
            <nav className="nav-element">
                <ul className="nav-bar">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/movieoverview">Movies</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/trending">Trending</Link></li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default NavigationBar;
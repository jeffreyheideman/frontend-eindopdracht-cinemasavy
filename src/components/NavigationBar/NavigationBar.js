import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');




    return (
        <div className="navigation-outer-wrapper">
            <form className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <nav className="nav-element">
                <ul className="nav-bar">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/movieoverview">
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/trending">
                            Trending
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;

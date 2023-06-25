import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import home from "../../pages/home/Home";

const NavigationBar = () => {

        return (
            <div className="navigation-outer-wrapper">
            <nav className="nav-element">
                <ul className="nav-bar">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/trending">
                            Trending
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/movieoverview">
                            My Watchlist
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;

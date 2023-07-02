import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import { AuthContext } from "../../context/AuthContext";

const NavigationBar = () => {
    const { isAuth, logout } = useContext(AuthContext);

    return (
        <div className="navigation-outer-wrapper">
            <nav className="nav-element">
                <ul className="nav-bar">
                    <div className="nav-item-container">
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
                            <Link className="nav-link" to="/watchlist">
                                My Watchlist
                            </Link>
                        </li>
                        { isAuth ? ( <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>) : null}
                    </div>
                    {isAuth ? (
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    ) : (
                        <div className="login-register-container">
                            <li className="nav-item log-reg-btn">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item log-reg-btn">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;

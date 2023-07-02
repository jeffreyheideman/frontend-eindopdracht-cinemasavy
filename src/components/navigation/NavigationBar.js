import React, { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './NavigationBar.css';
import { AuthContext } from "../../context/AuthContext";
import Button from "../button/Button";

const NavigationBar = () => {
    const { isAuth, logout } = useContext(AuthContext);

    const navigate = useNavigate()

    return (
        <div className="navigation-outer-wrapper">
            <nav className="nav-element">
               <h2 className="cinemasavvy">CinemaSavvy</h2>
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
                        <Button buttonName="Logout" type="button" onClick={logout} className="auth-button"/>
                    ) : (
                        <div className="login-register-container">
                            <li className="nav-item">
                                <Button buttonName="Register" type="button" className="auth-button" onClick={() => navigate("/register")}/>
                            </li>
                            <li className="nav-item">
                                <Button buttonName="Login" type="button" className="auth-button" onClick={() => navigate("/login")}/>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;

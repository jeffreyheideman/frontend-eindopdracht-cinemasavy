import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import { AuthContext } from '../../context/AuthContext';
import Button from '../button/Button';
import axios from 'axios';

const NavigationBar = () => {
    const { isAuth, logout } = useContext(AuthContext);
    const [img, setImg] = useState('');
    const navigate = useNavigate();

    const fetchProfileImg = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            });
            console.log(response.data);
            setImg(response.data.profilePicture);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchProfileImg();
    }, [isAuth]);

    return (
        <div className="navigation-outer-wrapper">
            <nav className="nav-element">
                <h2 className="cinemasavy">CinemaSavy</h2>
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
                        {isAuth ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                        ) : null}
                    </div>
                    {isAuth ? (
                        <div className="profile-container">
                            <Button buttonName="Logout" type="button" onClick={logout} className="auth-button" />
                            <Link to="/profile"><img className="picture" src={img} alt="Profile Picture" /></Link>
                        </div>
                    ) : (
                        <div className="login-register-container">
                            <li className="nav-item">
                                <Button buttonName="Register" type="button" className="auth-button" onClick={() => navigate('/register')} />
                            </li>
                            <li className="nav-item">
                                <Button buttonName="Login" type="button" className="auth-button" onClick={() => navigate('/login')} />
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;

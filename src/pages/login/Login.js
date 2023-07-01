/*
import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function Login() {
    const {login, logout} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Bearer": "xxx.xxx.xxx"
            }
        });
        login(response.data.accessToken);
        console.log("De gebruiker is ingelogd", response);
        } catch (e) {
        console.error("Er is iets misgegaan met het inloggen", e);
    }


}

    return (
        <main>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="username" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>
        </main>
    );
}


export default Login;*/


import {useRef, useState, useEffect, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import './Login.css';

import axios from 'axios';

const Login = () => {
    const {login, logout} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: user,
                password: pwd
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Bearer": "xxx.xxx.xxx"
                }
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            login(accessToken, roles);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <main className="login-page">
                {success ? (
                    <section className="login-container">
                        <h1>You are logged in!</h1>
                        <br/>
                        <p>
                            <a href="#">Go to Home</a>
                        </p>
                    </section>
                ) : (
                    <section className="login-container">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Sign In</h1>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label className="auth-label" htmlFor="username">Username:</label>
                            <input
                                className="username-input"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                className="password-input"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <button className="login-btn">Sign In</button>
                        </form>
                        <p>
                            Need an Account?<br/>
                            <span className="line">
                            {/*put router link here*/}
                                <a href="#">Sign Up</a>
                        </span>
                        </p>
                    </section>
                )}
            </main>
        </>

    )
}

export default Login
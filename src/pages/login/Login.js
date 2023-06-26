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


export default Login;
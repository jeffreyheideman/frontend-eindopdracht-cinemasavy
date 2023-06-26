import React, {useState} from 'react';
import axios from "axios";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: username,
                email: email,
                password: password,
                role: ["user", "admin"]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer xxx.xxx.xxx",
                }
            });
            console.log("De gebruiker is geregistreerd", response);
        } catch (e) {
            console.error("Er is iets misgegaan met het registreren", e.response);
        }
    }

    return (
        <main>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="passwordCheck">Password Check</label>
                <button type="submit">Register</button>
            </form>
        </main>
    );
}

export default Register;
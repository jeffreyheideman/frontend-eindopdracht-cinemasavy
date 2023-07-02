import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ProfilePage(props) {
    const { isAuth} = useContext(AuthContext);
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    const fetchUserData = async (e) => {
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
            setUserData(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchUserData();
    }, [isAuth]);

    return (
        <main>
            <h1>Profile</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
        </main>
    );
}

export default ProfilePage;

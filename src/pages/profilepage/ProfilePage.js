import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";

const ProfilePage = () => {
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
            setUserData(response.data);
        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        fetchUserData();
    }, [isAuth]);

    return (
        <main className="profile">
            <h1>Profile</h1>
            {userData.profilePicture &&
            <img src={userData.profilePicture} alt="profile picture" className="profile-picture" />}
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <Button className="edit-button" buttonName="Edit Profile" onClick={() => navigate('/editprofile')}>Edit Profile</Button>
        </main>
    );
}

export default ProfilePage;

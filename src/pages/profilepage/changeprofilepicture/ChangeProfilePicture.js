import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function ChangeProfilePicture(props) {
    const { isAuth, jwtToken } = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfilePicture(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        try {
            await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/upload-profile-picture',
                { profilePicture },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                }
            );
            console.log('Profile picture uploaded successfully!');
        } catch (error) {
            console.log('Failed to upload profile picture:', error);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Profile Picture</button>
            {profilePicture && (
                <div>
                    <h3>Preview:</h3>
                    <img src={profilePicture} alt="Profile" />
                </div>
            )}
        </div>
    );
}

export default ChangeProfilePicture

import React, { useState } from 'react';
import axios from 'axios';
import InputField from "../../components/inputfield/InputField";
import Button from "../../components/button/Button";
import './EditProfile.css';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {};

        if (email.trim() !== '') {
            payload.email = email;
        }
        if (password.trim() !== '') {
            payload.password = password;
        }
        if (passwordConfirmation.trim() !== '') {
            payload.repeatedPassword = passwordConfirmation;
        }

        try {
            const response = await axios.put('https://frontend-educational-backend.herokuapp.com/api/user', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });


            if (profilePicture) {
                const imagePayload = {
                    base64Image: profilePicture
                };

                const imageResponse = await axios.post('https://frontend-educational-backend.herokuapp.com/api/user/image', imagePayload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
        }
    };

    return (
        <main className="edit-profile-page">
            <h2>Edit your profile</h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-mailadres:</label>
                <InputField className="edit-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <InputField className="edit-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <label htmlFor="password-confirmation">Confirm Password:</label>
                <InputField className="edit-input" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />

                <label htmlFor="profile-picture">Profile Picture:</label>
                <InputField className="file-upload" type="file" id="profile-picture" accept="image/*" onChange={handleProfilePictureChange} />

                <Button className="save-btn" buttonName="Save" type="submit">Save</Button>
            </form>
        </main>
    );
};

export default EditProfile;

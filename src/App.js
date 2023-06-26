import React, {useContext, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './pages/home/Home';
import MovieOverview from './pages/movieoverview/MovieOverview';
import ProfilePage from './pages/profilepage/ProfilePage';
import TrendingPage from './pages/trendingpage/TrendingPage';
import './App.css';
import MovieDetailPage from './pages/moviedetailpage/MovieDetailPage';
import Login from "./pages/login/Login";
import Register from "./pages/registration/register";


function App() {



    return (
        <div className="app-container">
            <NavigationBar />
            <Routes>
                <Route  path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home />} />
                <Route path="/movieoverview" element={<MovieOverview />} />
                <Route path="/profile" element={<ProfilePage/>} />}
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/movies/:id" element={<MovieDetailPage/> } />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </div>
    );
}

export default App;

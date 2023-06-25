import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './pages/home/Home';
import MovieOverview from './pages/movieoverview/MovieOverview';
import ProfilePage from './pages/profilepage/ProfilePage';
import TrendingPage from './pages/trendingpage/TrendingPage';
import './App.css'; // Import the CSS file for styling
import MovieDetailPage from './pages/moviedetailpage/MovieDetailPage';


function App() {

    return (
        <div className="app-container">
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movieoverview" element={<MovieOverview />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/movies/:id" element={<MovieDetailPage/> } />
            </Routes>
        </div>
    );
}

export default App;

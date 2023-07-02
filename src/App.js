import React, {useContext, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
import Home from './pages/home/Home';
import ProfilePage from './pages/profilepage/ProfilePage';
import TrendingPage from './pages/trendingpage/TrendingPage';
import './App.css';
import MovieDetailPage from './pages/moviedetailpage/MovieDetailPage';
import Login from "./pages/login/Login";
import Register from "./pages/registration/register";
import WatchList from "./pages/watchlist/WatchList";
import {AuthContext} from "./context/AuthContext";
import {GlobalProvider} from "./context/GlobalState";
import Footer from "./components/footer/Footer";


function App() {

    const {isAuth} = useContext(AuthContext);


    return (
        <div className="app-container">
            <NavigationBar />
            <Routes>
                <Route  path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={ isAuth ? (<ProfilePage />) : (<Login/>)} />}
                <Route path="/profile/changeprofilepicture" element={ isAuth ? (<ProfilePage />) : (<Login/>)} />}
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/movies/:id" element={<MovieDetailPage/> } />
                <Route path="/watchlist" element={ isAuth ? (<WatchList />) : (<Login/>)} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
                <Footer />
        </div>
    );
}

export default App;

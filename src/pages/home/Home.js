import React, { useEffect, useState } from 'react';
import cinema from "../../assets/SpookyCinema-3.jpg";
import "./Home.css";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";

function Home() {
    const [airingTodayList, setAiringTodayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = 'd003c2ad249ab65c42c387482cebde5b';
    const API_ENDPOINT = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINT);
                const { results } = response.data;
                setAiringTodayList(results);
                setIsLoading(false);
                console.log(results);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Display only the first 5 items from airingTodayList
    const limitedAiringTodayList = airingTodayList.slice(0, 5);

    return (
        <>
            <div className="title-wrapper">
                <h1 className="new-movies-title">New and Upcoming</h1>
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="trending-list">
                        {limitedAiringTodayList.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} name={movie.name} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Home;

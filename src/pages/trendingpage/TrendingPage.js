import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingPage.css';
import MovieCard from '../components/MovieCard/Moviecard.js';

function TrendingPage() {
    const [trendingList, setTrendingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = 'd003c2ad249ab65c42c387482cebde5b';
    const API_ENDPOINT = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINT);
                const { results } = response.data;
                setTrendingList(results);
                setIsLoading(false);
                console.log(results);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Trending</h1>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="trending-list">
                        {trendingList.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default TrendingPage;
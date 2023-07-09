import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/moviecard/MovieCard';
import SearchBar from '../../components/search/SearchBar';
import './Home.css';

function Home() {
    const [airingTodayList, setAiringTodayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchKey, setSearchKey] = useState('');

    const API_KEY = 'd003c2ad249ab65c42c387482cebde5b';
    const SEARCH_TYPE = searchKey ? 'search/movie' : 'movie/now_playing';
    const API_ENDPOINT = `https://api.themoviedb.org/3/${SEARCH_TYPE}?api_key=${API_KEY}`;

    const fetchData = async () => {
        try {
            const url = searchKey
                ? `${API_ENDPOINT}&query=${encodeURIComponent(searchKey)}`
                : API_ENDPOINT;
            const response = await axios.get(url);
            const { results } = response.data;
            setAiringTodayList(results);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [searchKey]);


    const limitedAiringTodayList = airingTodayList.slice(0, 5);

    const handleSearch = () => {
        fetchData(searchKey);
    };

    const handleInputChange = (e) => {
        setSearchKey(e.target.value);
    };

    return (
        <>
            <SearchBar
                searchKey={searchKey}
                onSearch={handleSearch}
                onInputChange={handleInputChange}
            />
            {searchKey ? null : (
                <div className="title-wrapper">
                    <h1 className="new-movies-title">New and Upcoming</h1>
                </div>
            )}
            <div className="movie-list-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="new-movie-list">
                        {limitedAiringTodayList.map((movie) => (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                                name={movie.title}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Home;

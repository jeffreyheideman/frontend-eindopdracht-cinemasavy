import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingPage.css';
import MovieCard from '../../components/moviecard/MovieCard';
import SearchBar from "../../components/search/SearchBar";

function TrendingPage() {
    const [trendingList, setTrendingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchKey, setSearchKey] = useState('');

    const API_KEY = 'd003c2ad249ab65c42c387482cebde5b';
    const SEARCH_TYPE = searchKey ? 'search/movie' : 'trending/movie/day';
    const API_ENDPOINT = `https://api.themoviedb.org/3/${SEARCH_TYPE}?api_key=${API_KEY}`;

    const fetchData = async () => {
        try {
            const url = searchKey
                ? `${API_ENDPOINT}&query=${encodeURIComponent(searchKey)}`
                : API_ENDPOINT;
            const response = await axios.get(url);
            const { results } = response.data;
            setTrendingList(results);
            setIsLoading(false);
            console.log(results);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchKey]);

    const handleSearch = () => {
        fetchData();
    }

    const handleInputChange = (e) => {
        setSearchKey(e.target.value);
    }

    return (
        <main className="trending-page-container">
            <SearchBar
                searchKey={searchKey}
                onSearch={handleSearch}
                onInputChange={handleInputChange}
            />
            {searchKey ? null : <h1 className="title-trending">Trending</h1>}
            <div className="trending-list-outer-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="trending-list">
                        {trendingList.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} name={movie.title} />
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

export default TrendingPage;

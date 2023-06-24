import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {findAllByDisplayValue} from "@testing-library/react";
import "./MovieDetailPage.css"

function MovieDetailPage() {
    const {id} = useParams();

    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=d003c2ad249ab65c42c387482cebde5b`
                );
                setMovieDetails(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="movie-container">
            <div className="movie-img-container">
                <img className="movie-img" src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title}/>
            </div>
            <div className="movie-description-container">
                <h2>{movieDetails.title}</h2>
                <p>{movieDetails.overview}</p>
            </div>
            </div>
        </>

    );
}

export default MovieDetailPage;

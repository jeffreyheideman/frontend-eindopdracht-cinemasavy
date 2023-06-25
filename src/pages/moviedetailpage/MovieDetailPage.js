import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import "./MovieDetailPage.css";

function MovieDetailPage() {
    const {id} = useParams();

    const [movieDetails, setMovieDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState('');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=d003c2ad249ab65c42c387482cebde5b`
                );
                setMovieDetails(response.data);
                const trailerResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d003c2ad249ab65c42c387482cebde5b`
                );
                const results = trailerResponse.data.results;
                const officialTrailer = results.find((video) =>
                    video.name.toLowerCase().includes('official trailer')
                );
                if (officialTrailer) {
                    setTrailerKey(officialTrailer.key);
                } else if (results.length > 0) {
                    // If no "official trailer" found, use the first video in the array
                    setTrailerKey(results[0].key);
                } else {
                    // No trailer available
                    setTrailerKey('');
                }
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
                    <img
                        className="movie-img"
                        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                    />
                </div>
                <div className="movie-description-container">
                    <h2>{movieDetails.title}</h2>
                    <p>{movieDetails.overview}</p>
                </div>
            </div>
            <div className="movie-trailer-container">
                {trailerKey && (
                    <YouTube
                        videoId={trailerKey}
                        opts={{
                            width: '560',
                            height: '315',
                        }}
                    />
                )}
            </div>

        </>
    );
}

export default MovieDetailPage;

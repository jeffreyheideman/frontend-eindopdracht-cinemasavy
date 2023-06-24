import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetailPage() {
    const { id } = useParams();

    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=d003c2ad249ab65c42c387482cebde5b`
                );
                setMovieDetails(response.data);
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
        <div>
            <h2>{movieDetails.title}</h2>
        </div>
    );
}

export default MovieDetailPage;

import React from 'react';
import './SearchBar.css';

function SearchBar({ searchKey, onSearch, onInputChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <div className="search-bar-container">
        <form className="search-bar-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchKey}
                onChange={onInputChange}
                className="search-bar-input"
                placeholder="Search for a movie"
            />
            <button className="search-bar-btn" type="submit"></button>
        </form>
        </div>
    );

}

export default SearchBar;
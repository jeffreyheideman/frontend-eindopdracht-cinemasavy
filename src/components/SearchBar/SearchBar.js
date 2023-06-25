import React from 'react';
import './SearchBar.css';

function SearchBar({ searchKey, onSearch, onInputChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form className="search-bar-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchKey}
                onChange={onInputChange}
                className="search-bar-input"
            />
            <button className="search-bar-btn" type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
import React from 'react';
import './SearchBar.css';
import Button from "../button/Button";
import InputField from "../inputfield/InputField";

function SearchBar({ searchKey, onSearch, onInputChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <div className="search-bar-container">
        <form className="search-bar-form" onSubmit={handleSubmit}>
            <InputField
                type="text"
                placeholder="Search for a movie"
                value={searchKey}
                className="search-bar-input"
                onChange={onInputChange}
            />
            <Button type="button" className="search-bar-btn"/>
        </form>
        </div>
    );

}

export default SearchBar;
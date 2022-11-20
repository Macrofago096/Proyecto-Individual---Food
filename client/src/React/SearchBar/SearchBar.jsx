import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipe } from '../../Redux/actions';
import "./SearchBar.css"

export default function SearchBar() {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    function handleInputChange (e){
        setTitle(e.target.value)
    };

    function handleSubmit (e){
        dispatch(getRecipe(title))
    };

    return (
        <div className="search">
            <input 
            className="searchInput"
            type="search"
            placeholder = "Search..."
            value={title}
            onChange = {e => handleInputChange(e)}
            />
            <button 
            type="submit"
            className="searchButton"
            onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
};
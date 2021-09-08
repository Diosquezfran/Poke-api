import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/Actions';
import styles from './SearchBar.module.css'

function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();    
    
    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(getByName(name))
        setName('')
    }
    
    return (
        <div>
            <input
            className={styles.searchBar}
            type="text"
            placeholder="find a pokemon"
            onChange={(e) => handleChange(e)}
            />
            <button className={styles.searchButton} onClick={()=>handleSubmit()}>Buscar</button>
        </div>
    )
}

export default SearchBar;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.imagen}>
            <div className={styles.homeContent}>
                <h1 className={styles.title}>Welcome to Pokeapi</h1>
                <Link to='/PokeList' className={styles.homeButton}>
                    Descubre pokemons
                </Link>
            </div>
        </div>
    )
};

export default Home;
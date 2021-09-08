import React from 'react';
import styles from './PokeDetail.module.css';
import { BsHeart, BsArrowsExpand } from 'react-icons/bs';
import { FaRunning, FaConnectdevelop } from 'react-icons/fa';
import {RiSwordFill} from 'react-icons/ri'

function PokeDetail({pokemon}) {
    console.log(pokemon);

    return (
        <div className={styles.detailCard}>
            <div className={styles.imageContainer}>
                <img src={pokemon.image} alt="pic" className={styles.cardImage}/>
            </div>
            <div className={styles.cardContent}>
                <h2>Nombre: {pokemon.name}</h2>
                <h4><RiSwordFill/>: {pokemon.attack}</h4>
                <h4><BsHeart/>: {pokemon.life}</h4>
                <h4><BsArrowsExpand/>: {pokemon.height}</h4>
                <h4><BsArrowsExpand/>: {pokemon.weight}</h4>
                <h4>Id: {pokemon.id}</h4>
                <h4><FaRunning/>: {pokemon.speed}</h4>

                <h4><FaConnectdevelop/>: {pokemon.types?.map(t => t + ' ')} </h4>
            </div>
        </div>
    )
}

export default PokeDetail;

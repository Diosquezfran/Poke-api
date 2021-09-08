import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokeCard.module.css";
import img from "../../assets/example.png";

function PokeCard({ pokemon }) {
  return (
    // <Link >
      <div className={styles.card} >
        <div className={styles.cardContainer}>
            <Link to={`/PokeDetail/${pokemon.id}`} className={styles.link}>
                <img src={pokemon.image} alt="pic" className={styles.cardImg}  />
            </Link>
            <div className={styles.cardContent}>
                <h1>{pokemon.name}</h1>
                {pokemon.types &&
                pokemon.types.map((t) => {
                    return <h3 key={t}>{t}</h3>;
                })}
            </div>
        </div>
      </div>
    // </Link>
  );
}

export default PokeCard;

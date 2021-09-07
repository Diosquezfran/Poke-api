import React from 'react';
import { Link } from 'react-router-dom';

function PokeCard({pokemon}) {
    return (
        <Link to={`/PokeDetail/${pokemon.id}`}>
            <div style={{backgroundColor:'green'}}>
                <h1>{pokemon.name}</h1>
                <div>
                    <img src={pokemon.image} alt="pic" />
                </div>  
                {pokemon.types && pokemon.types.map(t => {
                    return <h3 key={t}>{t}</h3>
                })}
            </div>
        </Link>
    )
}

export default PokeCard;

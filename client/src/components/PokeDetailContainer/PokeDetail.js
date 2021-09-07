import React from 'react';

function PokeDetail({pokemon}) {
    console.log(pokemon);

    return (
        <div>
            <img src={pokemon.image} alt="pic" />
            <h2>{pokemon.name}</h2>
        </div>
    )
}

export default PokeDetail;

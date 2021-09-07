import React from 'react';

function Paginado({ pokemonsPerPage, pokemons, paginado }) {
    const pageNumber = [];
//                                   40    /     9
    for (let i = 0; i < Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumber.push(i + 1)        
    };
    
    return (
        <ul>
           {pageNumber.length  && 
           pageNumber.map(numberPage =>
            <li style={{cursor: 'pointer'}} key={numberPage} onClick={() => paginado(numberPage)} >{numberPage}</li> 
           )} 
        </ul>
    )
};

export default Paginado;


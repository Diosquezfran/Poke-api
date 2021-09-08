import React from 'react';
import styes from './Paginado.module.css';

function Paginado({ pokemonsPerPage, pokemons, paginado }) {
    const pageNumber = [];
//                                   40    /     9
    for (let i = 0; i < Math.ceil(pokemons / pokemonsPerPage); i++) {
        pageNumber.push(i + 1)        
    };
    
    return (
        <ul className={styes.paginadoContainer}>
           {pageNumber.length > 0 ? 
           pageNumber.map(numberPage =>
            <li style={{cursor: 'pointer'}} key={numberPage} onClick={() => paginado(numberPage)} >{numberPage}</li> 
           ) : null} 
        </ul>
    )
};

export default Paginado;


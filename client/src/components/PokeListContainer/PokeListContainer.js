import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getByType, getFromDb, orderByName, orderByStrength } from "../../redux/Actions";
import { tipos } from '../../helper/tipos'
import PokeCard from "./PokeCard";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from './PokeListContainer.module.css';

function PokeListContainer() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [order, setOrder] = useState('')

  /*-----------  paginado  -----------*/

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
  const indexLastPokemon = currentPage * pokemonsPerPage; // 1 * 9 = 9
  const indexFirstPokemon = indexLastPokemon - pokemonsPerPage; // 9 - 9 = 0
  const currentPokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon);

  const paginado = (pagNum) => {
    setCurrentPage(pagNum);
  };  
  console.log(pokemons);
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilterType(e){
    dispatch(getByType(e.target.value))
  };

  function handleFilterDb(e){
    dispatch(getFromDb(e.target.value))
  };

  function handleOrderByName(e){
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`pagina ordenada en orden ${e.target.value}`)
  };

  function handleOrderByStrength(e){
    dispatch(orderByStrength(e.target.value))
    setCurrentPage(1)
    setOrder(`pagina ordenada en order ${e.target.value}`)
  };

  return (
    <div className={styles.listContainer}>
      <NavBar />
      <div className={styles.header}>
        <select className={styles.headerSelect} onChange={e => handleFilterType(e)}>
          <option value="all">all</option>
          {
            tipos.map((type) => (
              <option key={type} value={type} className={styles.headerOption}>
                {type}
              </option>
            ))}
        </select>
        <select className={styles.headerSelect} onChange={(e) => handleOrderByName(e)}>
          <option value='asc'>A / Z</option>
          <option value='desc'>Z / A</option>
        </select>
        <select className={styles.headerSelect} onChange={(e) => {handleOrderByStrength(e)}}>
          <option value='desc'>Mayor fuerza</option>
          <option value='asc'>Menor fuerza</option>
        </select>
        <select className={styles.headerSelect} onChange={(e)=>handleFilterDb(e)}>
          <option value="all">todos</option>
          <option value="exist">api</option>
          <option value="created">database</option>
        </select>
        {/* <input type="text" placeholder="Find a pokemon" /> */}
        <SearchBar />
      </div>
      <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        />
      <div className={styles.cardContainer}>
        {currentPokemons.length ?
          currentPokemons.map((p) => <PokeCard key={p.id} pokemon={p} />)
        : <p>cargando...</p>}
      </div>
    </div>
  );
}

export default PokeListContainer;

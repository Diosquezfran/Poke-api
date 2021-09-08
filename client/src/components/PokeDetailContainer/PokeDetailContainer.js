import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import PokeDetail from './PokeDetail';
import styles from './PokeDetailContainer.module.css';

function PokeDetailContainer() {
    const dispatch = useDispatch();
    const pokeDetail = useSelector(state => state.detail)
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getDetail(id))
    },[id]);

    return (
        <div className={styles.detailContainer}>
                {pokeDetail !== null ? <PokeDetail pokemon={pokeDetail}  /> 
                : <p>cargando...</p>}
            <Link to='/PokeList' className={styles.button}>volver</Link>

        </div>
    )
};

export default PokeDetailContainer;
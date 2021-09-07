import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import PokeDetail from './PokeDetail';

function PokeDetailContainer() {
    const dispatch = useDispatch();
    const pokeDetail = useSelector(state => state.detail)
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getDetail(id))
    },[id]);

    return (
        <div>
            soy el detalle de pokemon
            {pokeDetail !== null ? <PokeDetail pokemon={pokeDetail}  /> 
            : <p>cargando...</p>}
        </div>
    )
};

export default PokeDetailContainer;
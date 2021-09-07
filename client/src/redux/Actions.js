import axios from 'axios';

export const GET_ALL = 'GET_ALL';
export const GET_BY_TYPE = 'GET_BY_TYPE';
export const GET_FROM_DB = 'GET_FROM_DB';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_STRENGTH = 'ORDER_BY_STRENGTH';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_DETAIL = 'GET_DETAIL';

export const getPokemons = () => {
    return async ( dispatch ) => {
        try {
            let pokemons = await axios.get('http://localhost:3001/pokemons');
            return dispatch({
                type: GET_ALL,
                payload: pokemons.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const getByType = ( payload ) => {
    
    return {
        type: GET_BY_TYPE,
        payload
    }
}

export const getByName = ( name ) => {
    return async ( dispatch ) => {
        try {
            let data = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: data.data
            })
        } catch (error) {
            console.log(error)
        };
    };
};

export const getDetail = ( id ) => {
    return async ( disptach ) => {
        try {
            let data = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return disptach({
                type: GET_DETAIL,
                payload: data.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const createPokemon = (payload) => {
    return async ( dispatch ) => {
        try {
            let created = await axios.post('http://localhost:3001/pokemons', payload)
            return created 
        } catch (error) {
            console.log(error);
        }
        
    }
};


export const getTypes = () => {
    return async ( dispatch ) => {
        try {
            let data = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: GET_TYPES,
                payload: data.data
            })
        } catch (error) {
           console.log(error); 
        }
        
    }
}

export const getFromDb = ( payload ) => {
    return {
        type: GET_FROM_DB,
        payload
    }
}




export const orderByName = ( payload ) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByStrength = ( payload ) => {
    return {
        type: ORDER_BY_STRENGTH,
        payload
    }
}
import {
  GET_ALL,
  GET_BY_TYPE,
  GET_FROM_DB,
  ORDER_BY_NAME,
  ORDER_BY_STRENGTH,
  GET_BY_NAME,
  GET_TYPES,
  CREATE_POKEMON,
  GET_DETAIL
} from "./Actions";

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
  detail: {}
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };

    case GET_BY_TYPE:
      console.log('reducer', action.payload);
      const allPoke = state.allPokemons;
      console.log(allPoke);
      const pokeTypes =
        action.payload === "all"
          ? allPoke
          : allPoke.filter(p => 
            p.types.includes(action.payload)
          )
      return {
        ...state,
        pokemons: pokeTypes,
      };
    
    case GET_BY_NAME:
      return {
        ...state,
        pokemons: action.payload
      };
    
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      };

    case CREATE_POKEMON:
      return {
        ...state
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      };

    case GET_FROM_DB:
      const allPoke2 = state.allPokemons;
      const pokeCreated =
        action.payload === "created"
          ? allPoke2.filter((p) => p.dbOrigin)
          : allPoke2.filter((p) => !p.dbOrigin);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPoke2 : pokeCreated,
      };

    case ORDER_BY_NAME:
      let orderArr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                // b > a = a < b(10 > 5  =  5 < 10)
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: orderArr,
      };
    case ORDER_BY_STRENGTH:
        let orderStrength = action.payload === 'asc' ?
        state.pokemons.sort((a, b) => {
            return a.attack - b.attack
        }) : state.pokemons.sort((a, b) => {
            return b.attack - a.attack
        }) ;
        //esto debería funcionar, solo que los pokem no tienen la propiedad attack(mandar desde el back eso)
        return {
            ...state,
            pokemons: orderStrength
        }


    default:
      return state;
  }
};

export default Reducer;

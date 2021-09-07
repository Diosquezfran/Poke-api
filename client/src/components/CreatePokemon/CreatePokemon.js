import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, createPokemon } from "../../redux/Actions";

function CreatePokemon() {
  const initialValues = {
    name: "", //string
    life: "", // number
    attack: "", // number
    defense: "", // number
    speed: "", // number
    height: "", // number
    weight: "", // number
    type: [], // array
  };
  const [pokemon, setPokemon] = useState(initialValues);

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setPokemon({ ...pokemon, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setPokemon({
        ...pokemon,
        type: [...pokemon.type, e.target.value]
    })
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createPokemon(pokemon));
      setPokemon(initialValues)
      alert('creado')
  };

  return (
    <div>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="name" placeholder="Name" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="life" placeholder="Life" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="attack" placeholder="attack" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="defense" placeholder="defense" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="speed" placeholder="speed" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="height" placeholder="height" required onChange={(e) => handleChange(e)}/>
        <input type="number" name="weight" placeholder="weight" required onChange={(e) => handleChange(e)} />
        {/* <input type="text" name="image" placeholder="image" onChange={(e) => handleChange(e)}/> */}
        <select onChange={(e)=> handleSelect(e)}>
          {types.map((t) => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
        <button >Crear</button>
      </form>
      {pokemon.type.map((t) => <label key={t}>{t + '. '}</label>)}
    </div>
  );
}

export default CreatePokemon;

const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* -------------------- GET ALL -------------------- */

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;

  const getPokeApi = async () => {
    let total = [];
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const apiData = await apiUrl.data; 

    const apiUrl2 = await axios.get(apiData.next)
    const apiData2 = await apiUrl2.data;
    
    const totalPokemons = [...apiData.results, ...apiUrl2.data.results] ;

    for (let i = 0; i < totalPokemons.length; i++) {
      let pokeDetail = await axios.get(totalPokemons[i].url);
      let detailData = await pokeDetail.data;
      total.push({
        id: detailData.id,
        attack: detailData.stats[1].base_stat,
        name: detailData.name,
        image: detailData.sprites.other.dream_world.front_default,
        types: detailData.types.map((el) => el.type.name),
      });
    }

    return total;
  };

  const getPokeDB = async () => {
    return await Pokemon.findAll({
      include: {
        model: Tipo,
        attributes: ["name"],
        through: [],
      },
    });
  };

  const getAll = async () => {
    const apiData = await getPokeApi();
    const DbData = await getPokeDB();
    //mandar solo el array
    const totalData = apiData.concat(DbData);
    return totalData;
  };

  const totalPokemons = await getAll();

  if (name) {
    let pokeName = await totalPokemons.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    pokeName.length
      ? res.status(200).send(pokeName)
      : res.status(404).send("not found");
  } else {
    res.status(200).send(totalPokemons);
  }
});

/*----------------------------  GET BY ID   -------------------------------------- */

router.get("/pokemons/:idPokemon", async (req, res) => {
  const {idPokemon} = req.params;

  if(idPokemon.length < 3){
    try {
      const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const apiData = await apiUrl.data;
      const pokemon = {
        id: apiData.id,
        name: apiData.name,
        life: apiData.stats[0].base_stat,
        attack: apiData.stats[1].base_stat,
        defense: apiData.stats[2].base_stat,
        speed: apiData.stats[5].base_stat,
        height: apiData.height,
        weight: apiData.weight,
        image: apiData.sprites.other.dream_world.front_default,
        types: apiData.types.map((el) => el.type.name), 
      } 
      res.status(200).send(pokemon)
    } catch (error) {
      res.status(404).send('Not found')      
    }
  } else {
    try {
      const pokeDetail = await Pokemon.findByPk(idPokemon);
      res.status(200).send(pokeDetail)
    } catch (error) {
      res.status(404).send('not found')
    }
  }

});

/* -------------------- CREATE -------------------- */

router.post("/pokemons", async (req, res) => {
  const { name, life, attack, defense, speed, height, weight, dbOrigin, type } =
    req.body;

  let pokeCreated = await Pokemon.create({
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    // image
  });

  let tpyeDb = await Tipo.findAll({
    where: {
      name: type,
    },
  });

  pokeCreated.addTipo(tpyeDb);
  res.send("Creado exitosamente");
});

/* -------------------- GET TYPES -------------------- */


router.get("/types", async (req, res) => {
  const types = await axios.get("https://pokeapi.co/api/v2/type");
  const typesData = await types.data;
  typesData.results.forEach((el) => {
    Tipo.findOrCreate({
      where: { name: el.name },
    });
  });
  const allTypes = await Tipo.findAll();
  res.send(allTypes);
});


module.exports = router;
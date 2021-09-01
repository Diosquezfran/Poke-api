const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/pokemons', )

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;

  const getPokeApi = async () => {
    let total = [];
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const apiData = await apiUrl.data; // = [{}{}{}{}]
    const apiResults = apiData.results;
    for (let i = 0; i < apiResults.length; i++) {
      let pokeDetail = await axios.get(apiResults[i].url);
      let detailData = await pokeDetail.data;
      total.push({
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
    // const totalData = apiData.concat(DbData);
    const totalData = [...apiData, ...DbData];
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

  const getPokeApi = async () => {
    let total = [];
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const apiData = await apiUrl.data; // = [{}{}{}{}]
    const apiResults = apiData.results;
    for (let i = 0; i < apiResults.length; i++) {
      let pokeDetail = await axios.get(apiResults[i].url);
      let detailData = await pokeDetail.data;
      total.push({
        id: detailData.id,
        name: detailData.name,
        life: detailData.stats[0].base_stat,
        attack: detailData.stats[1].base_stat,
        defense: detailData.stats[2].base_stat,
        speed: detailData.stats[5].base_stat,
        height: detailData.height,
        weight: detailData.weight,
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
    // const totalData = apiData.concat(DbData);
    const totalData = [...apiData, ...DbData];
    return totalData;
  };

  const totalPokemons = await getAll();

  if (idPokemon) {
    let pokeId = await totalPokemons.find((p) => p.id == idPokemon);
    pokeId
      ? res.status(200).send(pokeId)
      : res.status(404).send("Not found");
  }
});

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
  });

  let tpyeDb = await Tipo.findAll({
    where: {
      name: type,
    },
  });

  pokeCreated.addTipo(tpyeDb);
  res.send("Creado exitosamente");
});

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

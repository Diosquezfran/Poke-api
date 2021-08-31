const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Tipo } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/pokemons', )

router.get('/pokemons', async (req, res) => {

    const name = req.query.name;

    const getPokeApi = async () => {
        const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const apiData = await apiUrl.data;
        return apiData.results;
    }

    const getPokeDB = async () => {
        return await Pokemon.findAll({
            include:{
                model: Tipo,
                attributes: ['name'],
                through: []
            }
        })
    }

    const getAll = async () => {
        const apiData = await getPokeApi();
        const DbData = await getPokeDB();
        const totalData = apiData.concat(DbData);
        return totalData;
    }


    const totalPokemons = await getAll();

    if(name){
        let pokeName = await totalPokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        pokeName.length ? 
        res.status(200).send(pokeName) : res.status(404).send('not found')
    } else {
        res.status(200).send(totalPokemons)
    }

})

router.get('/pokemons/:idPokemon', async (req, res) => {
    const {id} = req.params;



})

router.get('/types', async (req, res) => {
    const types = await axios.get('https://pokeapi.co/api/v2/type');
    const typesData = await types.data;
    typesData.results.forEach(el => {
        Tipo.findOrCreate({
            where: {name: el.name}
        })
    });
    const allTypes = await Tipo.findAll();
    res.send(allTypes)

})
module.exports = router;

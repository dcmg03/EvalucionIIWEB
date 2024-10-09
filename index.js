const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los personajes
app.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        console.log("Todos los personajes obtenidos:", response.data);
        res.render('index', { data: response.data.data, message: null });
    } catch (error) {
        console.error("Error al obtener todos los personajes:", error.message);
        res.render('index', { data: [], message: "No hay datos disponibles." });
    }
});

// Ruta para buscar por ID
app.get('/searchById', async (req, res) => {
    const id = req.query.id;
    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/${id}`);
        console.log("Personaje encontrado por ID:", response.data);
        res.render('index', { data: [response.data.data], message: null });
    } catch (error) {
        console.error("Error al buscar personaje por ID:", error.message);
        res.render('index', { data: [], message: "No se encontró el personaje." });
    }
});

// Ruta para buscar por nombre
app.get('/searchByName', async (req, res) => {
    const name = req.query.name;
    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/name/${name}`);
        console.log("Personajes encontrados por nombre:", response.data);
        res.render('index', { data: response.data.data, message: null });
    } catch (error) {
        console.error("Error al buscar personajes por nombre:", error.message);
        res.render('index', { data: [], message: "No se encontró el personaje." });
    }
});

// Inicializa el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

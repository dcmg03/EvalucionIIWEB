const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', './views');  // Asegúrate de que la carpeta "views" esté correctamente ubicada
app.use(express.static('public'));  // Archivos estáticos (CSS, imágenes, etc.)

// Ruta principal para renderizar la vista inicial
app.get('/', (req, res) => {
    res.render('index', { data: null });
});

// Ruta para obtener todos los personajes
app.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        res.render('index', { data: response.data });
    } catch (error) {
        console.error(error);
        res.render('index', { data: [] });
    }
});

// Ruta para obtener un personaje por ObjectId
app.get('/searchById', async (req, res) => {
    const { id } = req.query;
    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/${id}`);
        res.render('index', { data: [response.data] });
    } catch (error) {
        console.error(error);
        res.render('index', { data: [] });
    }
});

// Ruta para buscar personajes por nombre o parte del nombre
app.get('/searchByName', async (req, res) => {
    const { name } = req.query;

    // Verifica si el campo 'name' no está vacío
    if (!name || name.trim() === "") {
        return res.render('index', { data: [], message: "Por favor, ingresa un nombre para buscar." });
    }

    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/name/${name}`);
        res.render('index', { data: response.data });
    } catch (error) {
        console.error(error);
        res.render('index', { data: [], message: "Ocurrió un error al buscar el personaje." });
    }
});

// Servidor escuchando en el puerto 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

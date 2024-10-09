const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Ruta principal para renderizar la vista inicial
app.get('/', (req, res) => {
    res.render('index', { data: null, message: null });
});

// Ruta para obtener todos los personajes
app.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        console.log("Todos los personajes obtenidos:", response.data); // Depuración
        res.render('index', { data: response.data, message: null });
    } catch (error) {
        console.error("Error al obtener todos los personajes:", error.message); // Depuración
        res.render('index', { data: [], message: "No se pudieron obtener los datos de la API." });
    }
});

// Ruta para obtener un personaje por ObjectId
app.get('/searchById', async (req, res) => {
    const { id } = req.query;
    console.log("ID recibido:", id); // Depuración

    if (!id || id.trim() === "") {
        return res.render('index', { data: [], message: "Por favor, ingresa un ID válido." });
    }

    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/${id}`);
        console.log("Respuesta de búsqueda por ID:", response.data); // Depuración
        if (response.data) {
            res.render('index', { data: [response.data], message: null });
        } else {
            res.render('index', { data: [], message: "No se encontró el personaje." });
        }
    } catch (error) {
        console.error("Error al buscar personaje por ID:", error.message); // Depuración
        res.render('index', { data: [], message: "Ocurrió un error al buscar el personaje." });
    }
});

// Ruta para buscar personajes por nombre
app.get('/searchByName', async (req, res) => {
    const { name } = req.query;
    console.log("Nombre recibido:", name); // Depuración

    if (!name || name.trim() === "") {
        return res.render('index', { data: [], message: "Por favor, ingresa un nombre para buscar." });
    }

    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/name/${name}`);
        console.log("Respuesta de búsqueda por nombre:", response.data); // Depuración
        if (response.data && response.data.length > 0) {
            res.render('index', { data: response.data, message: null });
        } else {
            res.render('index', { data: [], message: "No se encontró el personaje." });
        }
    } catch (error) {
        console.error("Error al buscar personaje por nombre:", error.message); // Depuración
        res.render('index', { data: [], message: "Ocurrió un error al buscar el personaje." });
    }
});

// Servidor escuchando en el puerto 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

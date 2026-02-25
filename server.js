const express = require('express');
const path = require('path');

const app = express();

/**
 * Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Ruta principal para cargar el Dashboard de Atracciones
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'index.html'));
});

// Definir el puerto del servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor frontend corriendo en http://localhost:${PORT}`);
});
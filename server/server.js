const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Crear express app
const app = express();

//Configurar middleware estático para html
app.use(express.static(publicPath));

//Configurar ruta para servir la página
//No es necesario, lo encuentra automáticamente.

//Escuchar el puerto
app.listen(port, () => {
  console.log('Servidor is up in', port);
});

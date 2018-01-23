const path = require('path');
//Se usa el módulo http para configurar el socket con express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Crear express app
var app = express();
//En la implementación de express, él usa este paquete y el mismo método
//cuando se usa app.listen.
//normalmente recibiría un callback con req y res como argumentos
//pero tambien es compatible con pasarle solamente la app.
var server = http.createServer(app);
//La diferenciacion entre el servidor que usa http y la app que detrás de su
//implementación también la usaba, es para configurar el modulo socketio
//para que se integre con el servidor.
//Se le pasa el servidor.
//Retorna un WebSocketServer
//se puede hacer cualquier acción que implique escuchar o emitir eventos
var io = socketIO(server);

//Configurar middleware estático para html
app.use(express.static(publicPath));

//on permite registrar un evento
//Hay eventos que vienen por defecto como 'connection'
//Se recibe un socket, la intención es registrar cada conexión al servidor
//y socket representa una conexión realizada por medio del socket, más no
//todos los sockets o conexiones simultanes que tiene el servidor.
io.on('connection', (socket) => {
  console.log('New user connected');

  //Se emite un evento al cliente.
  //El evento se crea ahí mismo.
  //Se puede emitir un evento sin datos.
  socket.emit('newEmail', {
    from: 'Mike',
    text: 'Hey what is going on.',
    createdAt: 123
  });

  //Se escucha un evento proporcionado por el cliente
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  //registra un listener que se acciona cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

//Configurar ruta para servir la página
//No es necesario, lo encuentra automáticamente.

//Ahora se escucha el servidor, es parte de configurar socketio
server.listen(port, () => {
  console.log('Server is up on', port);
});

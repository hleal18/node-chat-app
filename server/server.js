const path = require('path');
//Se usa el módulo http para configurar el socket con express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const { generateMessage } = require('./utils/message.js');

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

    //Se emite un evento para la conexión actual haciéndole bienvenida
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //Se emite un evento para todos los demás sockets menos el actual.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    //Emitir un evento newMessage con from, text y createdAt
    // socket.emit('newMessage', {
    //   from: 'Humberto',
    //   text: 'Hey prro',
    //   createdAt: Date.now()
    // });

    //Escuchar un evento createMessage con from, text y crear createdAt
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //io emite eventos a todas las conexiones, a diferencia de socket
        //que lo hace para una conexión
        io.emit('newMessage', generateMessage(message.from, message.text));
        //Envía mensajes a todos menos al socket que representa la conexión propia.
        //socket.broadcast.emit('newMessage', {..message, createdAt: new Date().getTime()});

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

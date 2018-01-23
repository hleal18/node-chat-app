//Lo provee socket.io
//Se inicia la petición al servidor para comenzar la conexión
//WebSocket y mantenerla iniciada.
//Guarda el Socket en la variable, crítica para la comunicación.
var socket = io();

//connect permite establecer una acción cuando se conecta el cliente
//a un servidor.
socket.on('connect', function () {
  console.log('Connected to server');
  //Se emite un evento con un email cuando se concreta la conexión.
  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey. This is andrew'
  });
});

//Se añade listener a un evento que se acciona cuando se ocurre una
//desconexión con el servidor
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Custom events
//Se recibe información a partir del evento que se emitió desde el servidor
socket.on('newEmail', function (email) {
  console.log('New Email', email);
});

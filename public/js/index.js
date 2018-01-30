//Lo provee socket.io
//Se inicia la petición al servidor para comenzar la conexión
//WebSocket y mantenerla iniciada.
//Guarda el Socket en la variable, crítica para la comunicación.
var socket = io();

//connect permite establecer una acción cuando se conecta el cliente
//a un servidor.
socket.on('connect', function () {
  console.log('Connected to server');

  //Emitir un evento, createMessage con datos del texto
  // socket.emit('createMessage', {
  //   from: 'Cuchicuchi',
  //   text: 'EquisDe'
  // });
});

//Se añade listener a un evento que se acciona cuando se ocurre una
//desconexión con el servidor
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Custom events

//Escuchar un evento: newMessage e imprimir la información del mensaje
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

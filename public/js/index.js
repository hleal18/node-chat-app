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
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    const li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// //para usar acks con socketIO, se le pasa un callback como tercer argumento que se ejecuta
// //al llegar el evento al servidor
// socket.emit('createMessage', { from: 'Andrew', text: 'Prueba acknowledgment' }, function (data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    console.log('Funcion ejecutada');

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    })
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    })
});

socket.on('newLocationMessage', function (message) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});
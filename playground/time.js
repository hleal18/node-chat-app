const moment = require('moment');

//El estandar de las fechas en JavaScript es Jan 1st 00:00:00
//En UTC, zona horaria independiente
//Los timestamps (numero que indica el tiempo usando como referencia la indicada al inicio)
//se dan en milisegundos al usar Javascript

// const date = moment();
// date.add(100, 'year').subtract(9, 'month');
// console.log(date.format('MMM Do, YYYY'));

const date = moment();
console.log(date.format('h:mm a'));
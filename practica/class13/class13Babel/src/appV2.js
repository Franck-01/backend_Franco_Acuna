"use strict";

var array = [1, 2, 3, 4, 5];
array.map(function (valor) {
  return valor * 2;
}).forEach(function (valor) {
  return console.log(valor);
});

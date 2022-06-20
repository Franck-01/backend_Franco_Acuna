// let class1 = new personalClass("Juan");
// let class2 = new personalClass("Andre");
// let class3 = new personalClass("Fer");
// let class4 = new personalClass("Camila");

const SingletonClass = require("./singlenton");

let class1 = SingletonClass.getInstance();
let class2 = SingletonClass.getInstance();
let class3 = SingletonClass.getInstance();
let class4 = SingletonClass.getInstance();

console.log(class1);
console.log(class2);
console.log(class3);
console.log(class4);

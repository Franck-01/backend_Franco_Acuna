const Todos = require("./claseTodo");

const todos = new Todos();

console.log(todos.list());

todos.add("One task");
todos.add("two task");
todos.add("three task");

console.log(todos.list());

todos.complete("three task");
console.log(todos.list());

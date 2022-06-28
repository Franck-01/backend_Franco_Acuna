// Aqui vamos a escribir las pruebas

const Todos = require("./claseTodo");
const assert = require("assert");

describe("test para ToDo", () => {
  it("Deberia crear una instancia de la clase ToDO", () => {
    const todo = new Todos();
    assert.strictEqual(todo.list().length, 0);
  });

  it("Deberia agregar una tarea correctamente", () => {
    const todo = new Todos();
    todo.add("One task");
    todo.add("Two task");

    assert.strictEqual(todo.list().length, 2);
    assert.deepStrictEqual(todo.list(), [
      {
        title: "One task",
        complete: false,
      },
      {
        title: "Two task",
        complete: false,
      },
    ]);
  });
});

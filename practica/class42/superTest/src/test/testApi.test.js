const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("API - GET - /api/users", () => {
  it("Deveria devolver un status 200", async () => {
    let response = await request.get("/api/users");

    // Usamos la funcion expect --> basicamente es lo que espero que me devuelva
    expect(response.status).to.eql(201);
  });
});

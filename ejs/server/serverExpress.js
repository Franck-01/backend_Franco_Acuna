const express = require("express")

const app = express()

const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

app.get("/", (request, response) => {
    response.send("hola")
})
app.get("/user", (request, response) => {
    response.send({
        nombre: "Franco",
        apellido: "Acuña",
        age: 20,
        mail: "correo@mail.com"
    })
})
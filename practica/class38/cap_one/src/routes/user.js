const express = require("express")
const { userAll } = require("../services/user_services.js")

const routerUser = express.Router()

routerUser.get("/", (req, res) => {
    let users = userAll()
    res.send({ data: users })
})

module.exports = routerUser
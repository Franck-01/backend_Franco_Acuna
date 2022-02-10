const express = require("express")

const router = express.Router()

let pets = []

router.get("/", (req, res) => {
    res.send({ pets: pets })
})

router.post("/", (req, res) => {
    let pet = req.body
    console.log(pet)
    pets.push(pet)
    res.send({ message: "Acquired Pet" })
})

module.exports = router
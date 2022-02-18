const express = require("express")
const router = express.Router()

let productsColl = []

router.get("/", (req, res) => {
    res.send({ productsColl: productsColl })
})

router.post("/", (req, res) => {
    let product = req.body
    console.log(product)
    productsColl.push(product)
    res.send({ message: "Acquired product" })
})

module.exports = router
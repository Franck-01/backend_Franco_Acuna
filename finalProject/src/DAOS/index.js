const cartM_Mongo = require("./managers/cartManager.js")
const productM_Mongo = require("./managers/productManager.js")

let productDAO
let cartDAO
const db = "mongo"

switch (db) {
    case "mongo":
        productDAO = productM_Mongo
        cartDAO = cartM_Mongo
        console.log("DB Mongo")
        break
    default:
        break
}

module.exports = { productDAO, cartDAO }
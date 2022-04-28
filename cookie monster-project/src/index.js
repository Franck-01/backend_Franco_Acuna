const productM_Mongo = require("./config/productM_Mongo.js")

let productDAO
const db = "mongo"

switch (db) {
    case "mongo":
        productDAO = productM_Mongo
        console.log("esto es Mongo")
        break
    default:
        break
}

module.exports = { productDAO }
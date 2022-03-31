const productM_Firebase = require("./managerFire/productM_Firebase.js")
const productM_FS = require("./managersFs/productsM_FS")
const cartM_FS = require("./managersFs/cartM_FS")
const cartM_Mongo = require("./mongo/cartM_Mongo.js")
const productM_Mongo = require("./mongo/productM_Mongo.js")

let productDAO
let cartDAO
const db = "mongo"

switch (db) {
    case "mongo":
        productDAO = productM_Mongo
        cartDAO = cartM_Mongo
        console.log("esto es Mongo")
        break
    case "firebase":
        //productDAO = productM_Firebase
        console.log("esto es Firebase")
        break
    case "fs":
        //productDAO = productM_FS
        //cartDAO = cartM_FS
        console.log("esto es FileSistem")
        break
    default:
        break
}

module.exports = { productDAO, cartDAO }
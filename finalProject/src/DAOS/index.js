const cartM_Mongo = require('./managers/cartManager.js')
const productM_Mongo = require('./managers/productManager.js')
const UserDao = require('./guia_mongo/mongousers.js')

let productDAO
let cartDAO
let userDAO
const db = 'mongo'

switch (db) {
  case 'mongo':
    productDAO = new productM_Mongo()
    cartDAO = new cartM_Mongo()
    userDAO = new UserDao()
    console.log('DB Mongo')
    break
  default:
    break
}

module.exports = { productDAO, cartDAO, userDAO}

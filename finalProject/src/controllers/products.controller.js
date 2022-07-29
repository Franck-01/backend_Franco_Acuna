const { logConsole, logWarn } = require("../services/users.services.js")
const { productDAO } = require('../DAOS/index.js')
const admin = require('./admin.controller.js')

const productServices = new productDAO()

const AdminService = new admin()
let idAdmin = 1

const Admin = (req, res, next) => {
  AdminService.admin(idAdmin).then(result => {
    if (result) {
      next()
    } else {
      res.status(404).send({error: -1,description: 'only available as admin'})
    }
  })
}

const getProduct = async (req, res) => {
    productServices.Read()
        .then(products => res.render('product.ejs', { products: products }))
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const getProductId = async (req, res) => {
    let id = parseInt(req.params.id)
    await productServices.ReadId(id)
        .then((result) => res.send(result))
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const postProduct = async (req, res) => {
    let body = req.body
    await productServices.Create(body)
        .then((result) => res.send(result))
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const putProduct = async (req, res) => {
    let id = req.params.id
    let product = req.body
    await productServices.Update(id, product)
        .then((result) => res.send(result))
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}
const deleteProduct = async (req, res) => {
    let id = req.params.id
    await productServices.Delete(id)
        .then((result) => res.send(result))
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
}

module.exports = {Admin, getProduct, getProductId, postProduct, putProduct, deleteProduct}
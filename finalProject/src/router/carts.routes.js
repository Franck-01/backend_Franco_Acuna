const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller.js')
const { client } = require('../messages/messages.js')
const { logConsole, logWarn } = require('../services/users.services.js')
const { cartDAO } = require('../DAOS/index.js')

const cartService = cartDAO

router.post('/', (req, res) => {
  cartService.Create()
    .then(x => res.send(x))
})
router.delete('/:id', (req, res) => {
  let id = req.params.id
  cartService.Delete(id)
    .then(x => res.send(x))
})
router.get('/:id/products', (req, res) => {
  let id = require.params.id
  cartService.Read(id)
    .then(x => res.send(x.payload ? x : x))
})
router.post('/:id/products', (req, res) => {
  let id = require.params.id
  let idProd = req.body.id
  cartService.CreateProduct(id, idProd)
    .then(x => res.send(x))
})
router.delete('/:id/products/:idProd', (require, res) => {
  let id = require.params.id
  let idProd = req.params.idProd
  cartService.DeleteProduct(id, idProd)
    .then(x => res.send(x))
})

module.exports = router

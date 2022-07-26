const express = require('express')
const admin = require('../controllers/admin.controller.js')
const { productDAO} = require('../DAOS/index.js')

const isUserLogged = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/product')
}
const router = express.Router()
const AdminService = new admin()

let idAdmin = true

const AdminS = (req, res, next) => {
  AdminService.admin(idAdmin).then(result => {
    if (result) {
      next()
    } else {
      res.status(404).send({error: -1,description: 'the route is not authorized', message: 'you are not logged in as admin'})
    }
  })
}

router.get('/', isUserLogged, (req, res) => {
  productDAO.Read().then(products => res.render('createproduct.ejs', {products: products}))
})
router.post('/', AdminS, (req, res) => {
  let body = req.body
  productDAO.Create(body).then((result) => res.send(result))
})
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  productDAO.ReadId(id).then((result) => res.send(result))
})
router.put('/:id', AdminS, (req, res) => {
  let id = req.params.id
  let product = req.body
  productDAO.Update(id, product).then((result) => res.send(result))
})
router.delete('/:id', AdminS, (req, res) => {
  let id = req.params.id
  productDAO.Delete(id).then((result) => res.send(result))
})

const productRouter = router
module.exports = { productRouter}

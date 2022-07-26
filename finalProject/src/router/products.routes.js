const express = require('express')
const admin = require('../controllers/admin.controller.js')
const { productDAO} = require('../DAOS/index.js')

const isUserLogged = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/product')
}
const router = express.Router()

const productServices = new productDAO()

const AdminService = new admin()

const middleWare = (req, res, next) => {
  AdminService ? next() : res.send({status: 'error',message: 'only available as admin'})
}
router.get('/', isUserLogged, (req, res) => {
  productServices.Read().then(x => res.render('createproduct.ejs', {data: x.payload,user: req.session.passport.user}))
})
router.post('/', middleWare, (req, res) => {
  let body = req.body
  productServices.Create(body).then((result) => res.send(result))
})
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  productServices.ReadId(id).then((result) => res.send(result))
})
router.put('/:id', middleWare, (req, res) => {
  let id = req.params.id
  let product = req.body
  productServices.Update(id, product).then((result) => res.send(result))
})
router.delete('/:id', middleWare, (req, res) => {
  let id = req.params.id
  productServices.Delete(id).then((result) => res.send(result))
})

const productRouter = router
module.exports = { productRouter}

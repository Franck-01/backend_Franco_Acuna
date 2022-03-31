const express = require("express")
const router = express.Router()
const cartDAO = require("../DAO/index.js")

router.get("/", (req, res) => {
    cartDAO.Read().then((result) => res.send(result));
})

router.post("/", (req, res) => {
    const cart = req.body;
    cartDAO.Create(cart).then((result) => res.send(result));
})

router.put("/:id/products", (req, res) => {
    const id = parseInt(req.params.id);
    const cart = req.body;
    cartDAO.Update(id, cart).then((result) => res.send(result));
})

router.delete("/:id/products", (req, res) => {
        const id = parseInt(req.params.id);
        cartDAO.Delete(id).then((result) => res.send(result));
    })
    //FS
    /*const cartServices = new cartManager()

    router.get("/", (req, res) => {
        cartServices.getCart().then((result) => res.send(result));
    })

    router.post("/", (req, res) => {
        let cart = req.body;
        cartServices.createCart(cart).then((result) => res.send(result));
    })

    router.put("/:id/products", (req, res) => {
        let id = parseInt(req.params.id);
        let cart = req.body;
        cartServices.updateIdCart(id, cart).then((result) => res.send(result));
    })

    router.delete("/:id/products", (req, res) => {
        let id = parseInt(req.params.id);
        cartServices.deleteIdCart(id).then((result) => res.send(result));
    })
    router.post("/:id/products/:id", (req, res) => {
        let cartId = parseInt(req.params.id);
        let productId = req.body.id;
        cartServices.addProduct(cartId, productId).then((result) => res.send(result));
    });

    router.delete("/:id/products/:id_prod", (req, res) => {
        let id = parseInt(req.params.id);
        let id_prod = parseInt(req.params.id_prod);
        cartServices.deleteProductById(id, id_prod).then((result) => res.send(result));
    })*/
module.exports = router
const express = require("express")
const router = express.Router()
const cartsManager = require("../managers/cartManagers")

const cartServices = new cartsManager()

router.post("/", (req, res) => {
    let cart = req.body;
    cartServices.createCart(cart).then((result) => res.send(result));
});

router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    cartServices.deleteIdCart(id).then((result) => res.send(result));
});

router.get("/:id/products", (req, res) => {
    let id = parseInt(req.params.id);
    cartServices.getByIdCart(id).then((result) => res.send(result));
});

router.post("/:id/products", (req, res) => {
    let cartId = parseInt(req.params.id);
    let productId = req.body.id;
    cartServices.addProduct(cartId, productId).then((result) => res.send(result));
});

router.delete("/:id/products/:id_prod", (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    cartServices.deleteProductById(id, id_prod).then((result) => res.send(result));
});

module.exports = router;
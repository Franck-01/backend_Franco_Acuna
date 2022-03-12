const express = require("express")
const router = express.Router()
const productsManager = require("../managers/productsManagers")

const admin = true
const adminPermise = (req, res, next) => {
    if (admin) {
        next();
    } else {
        res.send({
            status: "error",
            error: `ruta /api/productos${req.url} método ${req.method} no autorizado`,
        })
    }
}

const productServices = new productsManager()

router.get("/", (req, res) => {
    productServices.getProduct().then((result) => res.send(result));
});

router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    productServices.getById(id).then((result) => res.send(result));
});

router.post("/", adminPermise, (req, res) => {
    let product = req.body;
    productServices.addProduct(product).then((result) => res.send(result));
});

router.put("/:id", adminPermise, (req, res) => {
    let id = parseInt(req.params.id);
    let product = req.body;
    productServices.updateIdProduct(id, product).then((result) => res.send(result));
});

router.delete("/:id", adminPermise, (req, res) => {
    let id = parseInt(req.params.id);
    productServices.deleteIdProduct(id).then((result) => res.send(result));
});

module.exports = router
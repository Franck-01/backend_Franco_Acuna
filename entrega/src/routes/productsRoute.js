const express = require("express")
const router = express.Router()
const productDAO = require("../DAO/index.js")

router.get("/", (req, res) => {
    productDAO.Read().then((result) => res.send(result));
})

router.post("/", (req, res) => {
    const product = req.body;
    productDAO.Create(product).then((result) => res.send(result));
})

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = req.body;
    productDAO.Update(id, product).then((result) => res.send(result));
})

router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);
        productDAO.Delete(id).then((result) => res.send(result));
    })
    //FS
    /*router.get("/", (req, res) => {
        productServices.getProduct().then((result) => res.send(result));
    })
    router.get("/:id", (req, res) => {
        let id = parseInt(req.params.id);
        productServices.getById(id).then((result) => res.send(result));
    })

    router.post("/", (req, res) => {
        let product = req.body;
        productServices.addProduct(product).then((result) => res.send(result));
    })

    router.put("/:id", (req, res) => {
        let id = parseInt(req.params.id);
        let product = req.body;
        productServices.updateIdProduct(id, product).then((result) => res.send(result));
    })

    router.delete("/:id", (req, res) => {
        let id = parseInt(req.params.id);
        productServices.deleteIdProduct(id).then((result) => res.send(result));
    }) */

module.exports = router
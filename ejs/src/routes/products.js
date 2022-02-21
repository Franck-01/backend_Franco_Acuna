const express = require("express")
const router = express.Router()
const uploader = require("../services/upload")
const FleetManager = require("../Managers/products")

let service = new FleetManager()

router.get("/", (req, res) => {
    service.get().then(result => res.send(result))
})
router.post("/", uploader.single("file"), (req, res) => {
    let product = req.body
    let file = req.file
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    product.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename
    service.add(product).then(result => res.send(result))
})
router.put("/:id", async(req, res) => {
    let { id } = req.params;

    let dataFIle = await Container.getById(id);
    if (dataFIle == "NULL") {
        return res.send({ MSG: "Id no encontrado" });
    }

    let newData = req.body;
    let upDateItem = await Container.updateById(id, newData);
    res.send(upDateItem);
})


module.exports = router
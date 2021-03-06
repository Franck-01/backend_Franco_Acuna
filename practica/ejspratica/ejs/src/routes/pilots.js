const express = require("express")
const router = express.Router()
const PilotsManager = require("../Managers/Pilots")
const uploader = require("../services/upload")

const pilotService = new PilotsManager()

router.get("/", (req, res) => {
    pilotService.get().then(result => res.send(result))
})
router.post("/", uploader.single("file"), (req, res) => {
    let pilot = req.body
    let file = req.file
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    pilot.thumbnail = req.protocol + "://" + req.hostname + ":8080/img/" + file.filename
    pilotService.add(pilot).then(result => res.send(result))
})

module.exports = router
const express = require("express");
const {
  getDatosController,
  postDatosController,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getDatosController);
router.post("/", postDatosController);

module.exports = router;

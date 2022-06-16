const express = require("express");
const {
  getDatosControllers,
  postDatosControllers,
} = require("../controllers/pruducts.Controller");

const router = express.Router();

// get
router.get("/", getDatosControllers);

// POST
router.post("/", postDatosControllers);

module.exports = router;

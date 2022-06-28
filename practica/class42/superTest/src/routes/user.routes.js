const express = require("express");
const {
  getAllUsers,
  getUsersById,
  createUser,
} = require("../controllers/user.controllers");

const { Router } = express;

const router = new Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUsersById);
router.post("/users", createUser);

module.exports = router;

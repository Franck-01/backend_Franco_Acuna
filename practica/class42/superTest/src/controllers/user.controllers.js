const {
  getUserServices,
  getUserByIdServices,
  createUserServices,
} = require("../services/user.services");

const getAllUsers = async (req, res) => {
  try {
    let users = await getUserServices();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error al obtener usuarios", error);
  }
};

// getUsersById
const getUsersById = async (req, res) => {
  try {
    let { id } = req.params;

    let users = await getUserByIdServices(id);
    res.json(users);
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    res.json({ message: "El usuario no existe!" });
  }
};

// createUser
const createUser = async (req, res) => {
  try {
    let userData = req.body;
    userData.id = Math.random();
    let userSave = await createUserServices(userData);
    res.json({
      message: "User Creted",
      data: userSave,
    });
  } catch (error) {
    console.log("Error al crear usuario", error);
  }
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
};

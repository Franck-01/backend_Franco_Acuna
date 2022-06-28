const { userDao } = require("../models/index");

// Aqui van los metodos que se van a comunicar con el DAOs

// getUserServices
const getUserServices = async () => {
  return await userDao.listAll();
};

// getUserByIdServices
const getUserByIdServices = async (id) => {
  return await userDao.listById(id);
};

// createUserServices
const createUserServices = async (data) => {
  return await userDao.save(data);
};

module.exports = {
  getUserServices,
  getUserByIdServices,
  createUserServices,
};

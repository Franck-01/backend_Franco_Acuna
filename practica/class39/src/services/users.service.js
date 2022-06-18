const { User } = require("../models/userData");

const obtenerDatos = async () => {
  let users = await User.findAll();
  return users;
};

const createData = async (data) => {
  let { username, password } = data;
  let user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    let userNew = await User.create({
      username,
      password,
    });
    return userNew;
  }

  return "El usuario ya existe!";
};

module.exports = {
  obtenerDatos,
  createData,
};

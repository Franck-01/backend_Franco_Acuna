const { obtenerDatos, crearDato } = require("../services/product.Services");

const getDatosControllers = async (req, res) => {
  // Armo logica de peticion
  let datos = await obtenerDatos();
  res.json(datos);
};

const postDatosControllers = async (req, res) => {
  let dato = req.body;
  await crearDato(dato);
  res.json(dato);
};

module.exports = {
  getDatosControllers,
  postDatosControllers,
};

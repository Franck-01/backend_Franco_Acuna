const ProductsApi = require("./src/services/products.service");
const MymongoClient = require("./src/models/db/mongoClient");

let client = new MymongoClient();
client.conected();

// instancio servicios
let productApi = new ProductsApi();

const ejecucion = async () => {
  try {
    switch (cmd) {
      case "buscar":
        console.log(await productApi.buscar());
        break;

      case "agregar":
        console.log(await productApi.agregar());
        break;

      case "borrar":
        console.log(await productApi.borrar());
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

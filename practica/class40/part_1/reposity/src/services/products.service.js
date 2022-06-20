const ProductDao = require("../models/daos/products.daos");
const RepositoryClass = require("../models/repositorys/product.repository");

class ProductsApi {
  constructor() {
    this.productDao = new ProductDao();
    this.productRepository = new RepositoryClass();
  }

  //   Metodos
  async buscarTodos() {
    let prods = await this.productRepository.getAllrepository();
    return prods;
  }

  async agregar(product) {
    let prodNew = await this.productDao.add(product);
    return prodNew;
  }

  async buscar(id) {
    let products;

    if (id) {
      products = await this.productDao.getById(id);
    } else {
      products = await this.productDao.getAll();
    }
    return products;
  }

  async borrar(id) {
    let products;

    if (id) {
      products = await this.productDao.getById(id);
    } else {
      products = await this.productDao.getAll();
    }
    return products;
  }
}

module.exports = ProductDao;

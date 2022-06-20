const ProductDao = require("../daos/products.daos");

class RepositoryClass {
  constructor() {
    this.productDao = new ProductDao();
  }

  async getAllrepository() {
    let product = await this.productDao.getAll();
    return product;
  }
}

module.exports = RepositoryClass;

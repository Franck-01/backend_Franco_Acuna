const faker = require("faker")

class memoryCont {
    constructor() {
        this.products = []
    }
    Read = () => {
        return this.products
    }
    ReadId = (id) => {
        let product = this.products.find(prod => prod.id === id)
        return product ? product : null
    }
    Create = (product) => {
        product.id = datatype.uuid()
        this.products.push(product)
        return product
    }
    Update = (id, product) => {
        let index = this.products.findIndex(prod => prod.id === id)
        product.id = this.users[index].id
        this.products[index] = product
        return product
    }
    Delete = (id) => {
        let index = this.products.filter(prod => prod.id !== id)
        this.products.push(index)
        return index
    }
}
module.exports = memoryCont
const faker = require("faker")
const PrincipalManager = require("../manager/PrincipalManager.js")

class productManager extends PrincipalManager {
    constructor() {
        super()
    }
    createProduct = (cant) => {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            nuevos.push({
                name: faker.commerce.product(),
                price: faker.commerce.price(50, 200),
                img: faker.image.avatar()
            })
        }
        this.products = [...this.products, ...nuevos]
        return nuevos
    }
}

module.exports = productManager
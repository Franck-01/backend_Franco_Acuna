const faker = require("faker")
const memoryCont = require("../container/memoryCont.js")

class productManager extends memoryCont {
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
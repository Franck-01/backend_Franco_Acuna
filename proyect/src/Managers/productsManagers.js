const fs = require("fs")
const productsPath = __dirname + "/../files/products.json"

const fetch = async() => {
    let data = await fs.promises.readFile(productsPath, "utf-8")
    let products = JSON.parse(data)
    return products
}

class productsManager {
    get = async() => {
        if (fs.existsSync(productsPath)) {
            try {
                let products = await fetch()
                return { status: "sucess", payload: products }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }
    }
    getAll = async() => {
        if (fs.existsSync(productsPath)) {
            let products = await fetch()
            return { status: "success", load: products }
        }
    }
    add = async(product) => {
        if (fs.existsSync(productsPath)) {
            try {
                let products = await fetch()
                if (products.length === 0) {
                    product.id = 1
                    await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2))
                    return { status: "success", message: "Product added" }
                }
                product.id = products[products.length - 1].id + 1
                products.push(product)
                await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2))
                return { status: "sucess", message: "Product added" }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            product.id = 1
            await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2))
            return { status: "success", message: "Product added" }
        }
    }
}

module.exports = productsManager
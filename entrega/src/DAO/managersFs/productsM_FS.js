const fs = require("fs")
const productsPath = __dirname + "/../files/products.json"

const fetch = async() => {
    let data = await fs.promises.readFile(productsPath, "utf-8", null, 2)
    let products = JSON.parse(data)
    return products
}

class productsManager {
    getProduct = async() => {
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
    getById = async(id) => {
        if (!id) return { status: "error", error: "ID needed" };
        if (fs.existsSync(productsPath)) {
            let products = await fetch()
            let product = products.find((p) => p.id === id);
            if (product) return { status: "success", payload: product };
            else return { status: "error", error: "Null" };
        }
    }
    addProduct = async(product) => {
        if (fs.existsSync(productsPath)) {
            try {
                let products = await fetch()
                if (products.length === 0) {
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                    return { status: "succes", message: "the first product" }
                }
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                return { status: "success", message: `Product saved id:${product.id}` }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            try {
                product.id = 1;
                await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2));
                return { status: "success", message: `Product saved id:${product.id}` }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }
    updateIdProduct = async(id, product) => {
        if (!id) { return { status: "error", error: "ID missing" } }
        if (isNaN(id)) { return { status: "error", error: "ID is not a number" } }
        if (fs.existsSync(productsPath)) {
            try {
                let products = await fetch()
                const news = products.map(prop => {
                    if (prop.id === parseInt(id)) {
                        product.id = id
                        return product
                    } else {
                        return prop
                    }
                })
                await fs.promises.writeFile(productsPath, JSON.stringify(news, null, 2))
                return { status: "success", message: "product update" }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }
    deleteIdProduct = async(id) => {
        if (!id) { return { status: "error", error: "ID missing" } }
        if (isNaN(id)) { return { status: "error", error: "ID is not a number" } }
        let products = await fetch()
        let product = products.find((p) => p.id === id);
        if (product) {
            let newProducts = products.filter((product) => product.id !== parseInt(id));
            await fs.promises.writeFile(productsPath, JSON.stringify(newProducts, null, 2))
            return { status: "success", message: "Product deleted" };
        } else {
            return { status: "error", error: "Product not found" };
        }
    }
}


module.exports = productsManager
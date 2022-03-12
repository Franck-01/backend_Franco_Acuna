const fs = require("fs")
const productsPath = __dirname + "/../files/products.json"

const fetch = async() => {
    let data = await fs.promises.readFile(productsPath, "utf-8")
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
        if (!product.name ||
            !product.model ||
            !product.description ||
            !product.price ||
            !product.URL_img
        )
            return { status: "error", error: "missing field" };
        try {
            if (fs.existsSync(productsPath)) {
                let products = await fetch()
                let id = products[products.length - 1].id + 1;
                let timestamp = new Date();
                product.id = id;
                product.timestamp = timestamp;
                products.push(product);
                await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                return { status: "success", message: `Product saved id:${product.id}`, };
            } else {
                let timestamp = new Date();
                product.id = 1;
                product.timestamp = timestamp;
                await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2));
                return { status: "success", message: `Product saved id:${product.id}`, };
            }
        } catch (error) {
            return { status: "error", message: error };
        }
    }
    updateIdProduct = async(id, product) => {
        if (!product.name ||
            !product.model ||
            !product.description ||
            !product.price ||
            !product.URL_img
        )
            return { status: "error", error: "missing field" };
        try {
            if (fs.existsSync(productsPath)) {
                let products = await fetch()
                let savedProd = products.find((p) => p.id == id);
                if (!savedProd) {
                    return { status: "error", message: "product not found" };
                } else {
                    let id = savedProd.id;
                    let timestamp = new Date();
                    product.id = id;
                    product.timestamp = timestamp;
                    let index = products.findIndex((p) => p.id == id);
                    products[index] = product;
                    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                    return { status: "success", message: `Product updated id:${product.id}` }
                }
            } else {
                return { status: "error", message: "product not found" };
            }
        } catch (error) {
            return { status: "error", message: error };
        }
    };
    deleteIdProduct = async(id) => {
        if (!id) return { status: "error", error: "ID needed" };
        if (fs.existsSync(productsPath)) {
            let products = await fetch()
            let product = products.find((p) => p.id === id);
            if (product) {
                let newProducts = products.filter((product) => product.id !== id);
                await fs.promises.writeFile(productsPath, JSON.stringify(newProducts, null, 2))
                return { status: "success", message: "Product deleted" };
            } else {
                return { status: "error", error: "Product not found" };
            }
        }
    }
}

module.exports = productsManager
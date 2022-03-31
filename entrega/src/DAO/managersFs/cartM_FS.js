const fs = require("fs")
const productsManager = require("./productsM_FS")

const productServices = new productsManager()
const cartPath = __dirname + "/../files/carts.json"


const fetch = async() => {
    let data = await fs.promises.readFile(cartPath, "utf-8", null, 2)
    let carts = JSON.parse(data)
    return carts
}

class cartsManager {
    createCart = async(cart) => {
        if (fs.existsSync(cartPath)) {
            try {
                const carts = await fetch()
                if (carts.length === 0) {
                    cart.id = 1
                    carts.push(cart)
                    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
                    return { status: "success", message: "the first cart" }
                }
                cart.id = carts[carts.length - 1].id + 1
                cart.product = []
                carts.push(cart)
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
                return { status: "success", message: `Cart saved id:${cart.id}` }
            } catch (error) {
                return { status: "error", message: error }
            }
        } else {
            try {
                cart.id = 1
                cart.product = []
                await fs.promises.writeFile(cartPath, JSON.stringify([cart], null, 2))
                return { status: "success", message: `Cart saved id:${cart.id}` }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }
    getCart = async() => {
        if (fs.existsSync(cartPath)) {
            try {
                const carts = await fetch()
                return { status: "sucess", payload: carts }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }
    }
    updateIdCart = async(id, cart) => {
        if (!id) { return { status: "error", error: "ID missing" } }
        if (isNaN(id)) { return { status: "error", error: "ID is not a number" } }
        if (fs.existsSync(cartPath)) {
            try {
                let carts = await fetch()
                const news = carts.map(cat => {
                    if (cat.id === parseInt(id)) {
                        cart.id = id
                        return cart
                    } else {
                        return cat
                    }
                })
                await fs.promises.writeFile(cartPath, JSON.stringify(news, null, 2))
                return { status: "success", message: "product update" }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }
    deleteIdCart = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        if (fs.existsSync(cartPath)) {
            let carts = await fetch()
            let cart = carts.find((p) => p.id === id);
            if (cart) {
                let newCarts = carts.filter((cart) => cart.id !== id);
                await fs.promises.writeFile(cartPath, JSON.stringify(newCarts, null, 2))
                return { status: "success", message: "Product deleted" };
            } else {
                return { status: "error", error: "Product not found" };
            }
        }
    }
    addProduct = async(cartId, productId) => {
        try {
            if (!cartId || !productId) return { status: "error", error: "missing field" };
            if (fs.existsSync(cartPath)) {
                let carts = await fetch()
                let cart = carts.find((p) => p.id === cartId);
                if (cart) {
                    let product = await productServices.getById(productId);
                    if (product.status === "success") {
                        cart.product.push(product.payload.id);
                        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
                        return { status: "success", message: `Product id:${product.payload.id} added to cart id:${cart.id}` }
                    } else {
                        return { status: "error", error: "Product not found" }
                    }
                } else {
                    return { status: "error", error: "Cart not found" }
                }
            } else {
                return { status: "error", error: "Cart not found" }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }
    deleteProductById = async(id, prod_id) => {
        if (!id || !prod_id) return { status: "error", error: "missing field" };
        if (fs.existsSync(cartPath)) {
            let carts = await fetch()
            let cart = carts.find((cart) => cart.id === id);
            if (cart) {
                let cartProd = cart.product.find((prod) => prod === prod_id);
                if (cartProd) {
                    let newCart = cart.product.filter((prod) => prod !== prod_id);
                    cart.product = newCart;
                    await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
                } else {
                    return { status: "error", error: "Product not found" }
                }
                return { status: "success", message: "Product deleted" }
            } else {
                return { status: "error", error: "Product not found" }
            }
        }
    }
}

module.exports = cartsManager
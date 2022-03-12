const fs = require("fs")
const productsManager = require("./productsManagers")

const productServices = new productsManager()

const cartPath = __dirname + "/../files/carts.json"

const fetch = async() => {
    let data = await fs.promises.readFile(cartPath, "utf-8")
    let carts = JSON.parse(data)
    return carts
}

class cartsManager {
    createCart = async(cart) => {
        try {
            if (fs.existsSync(cartPath)) {
                let carts = await fetch()
                let id = carts[carts.length - 1].id + 1;
                let timestamp = new Date();
                cart.id = id;
                cart.timestamp = timestamp;
                cart.product = [];
                carts.push(cart);
                await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
                return { status: "success", message: `Cart saved id:${cart.id}` }
            } else {
                let timestamp = new Date();
                cart.id = 1;
                cart.timestamp = timestamp;
                cart.product = [];
                await fs.promises.writeFile(cartPath, JSON.stringify([cart], null, 2))
                return { status: "success", message: `Cart saved id:${cart.id}` }
            }
        } catch (error) {
            return { status: "error", message: error };
        }
    }
    getCart = async() => {
        if (fs.existsSync(cartPath)) {
            try {
                let carts = await fetch()
                return { status: "sucess", payload: carts }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }
    }
    getByIdCart = async(id) => {
        if (!id) return { status: "error", error: "ID needed" }
        if (fs.existsSync(cartPath)) {
            let carts = await fetch()
            let cart = carts.find(u => u.id === id)
            if (cart) return { status: "succes", cart: cart.product }
            else return { status: "error", error: "cart not found" }
        }
    }
    deleteIdCart = async(id) => {
        if (!id) return { status: "error", error: "ID needed" };
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
    deleteAllCart = () => {
        fs.unlinkSync("/../files/carts.json")
        return { status: "sucess", message: "archive with carts: DELETE" }
    }

    addProduct = async(cartId, productId) => {
        try {
            if (!cartId || !productId)
                return { status: "error", error: "missing field" };
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
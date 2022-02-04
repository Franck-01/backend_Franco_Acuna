const fs = require("fs");

const pathProducts = "./ecommers/products.txt"
class Administrator {
    saveProduct = async(ship) => {
        if (!ship.name || !ship.model || !ship.cost) return { status: "error", error: "informacion perdida" }
        try {
            if (fs.existsSync(pathProducts)) {
                let data = await fs.promises.readFile(pathProducts, "utf-8")
                let ships = JSON.parse(data)
                let id = ships[ships.length - 1].id + 1
                ship.id = id
                ships.push(ship)
                await fs.promises.writeFile(pathProducts, JSON.stringify(ships, null, 2))
                return { status: "sucess", message: "Producto adquirido" }
            } else {
                ship.id = 1
                await fs.promises.writeFile(pathProducts, JSON.stringify([ship], null, 2))
                return { status: "sucess", message: "Producto adquirido" }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }
    getProduct = async() => {
        if (fs.existsSync(pathProducts)) {
            let data = await fs.promises.readFile(pathProducts, "utf-8")
            let ships = JSON.parse(data)
            return { status: "success", load: ships }
        }
    }
    randomProduct = async() => {
        if (fs.existsSync(pathProducts)) {
            let data = await fs.promises.readFile(pathProducts, "utf-8", null, 3)
            let ships = JSON.parse(data)

            let randoms = Math.floor(Math.random() * (ships.length) + 1)
            return { status: "sucess", ship: randoms }
        }
    }
    getAll = async() => {
        if (fs.existsSync(pathProducts)) {
            let data = await fs.promises.readFile(pathProducts, "utf-8")
            let ships = JSON.parse(data)
            return { status: "success", load: ships }
        }
    }
}


module.exports = Administrator;
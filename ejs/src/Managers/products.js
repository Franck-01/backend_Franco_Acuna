const fs = require("fs")

const pathToProducts = __dirname + "../file/products"

class FleetManager {

    add = async(ship) => {
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let ships = JSON.parse(data);
            let id = ships[ships.length - 1].id + 1
            ship.id = id;
            ships.push(ship);
            await fs.promises.writeFile(pathToProducts, JSON.stringify(ships, null, 2));
            return { status: "success", message: "Added 1 product" }
        } else {
            ship.id = 1;
            await fs.promises.writeFile(pathToProducts, JSON.stringify([ship], null, 2));
            return { status: "success", message: "Added 1 product" }
        }
    }
    get = async() => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let ships = JSON.parse(data);
                return { status: "success", payload: ships }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }
    }
}
module.exports = FleetManager;
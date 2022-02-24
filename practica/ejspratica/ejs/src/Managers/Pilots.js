const fs = require("fs")

const pathToPilots = __dirname + "/../files/pilots"

class PilotsManager {

    add = async(pilot) => {
        if (fs.existsSync(pathToPilots)) {
            let data = await fs.promises.readFile(pathToPilots, 'utf-8');
            let pilots = JSON.parse(data);
            let id = pilots[pilots.length - 1].id + 1
            pilot.id = id;
            pilots.push(pilot);
            await fs.promises.writeFile(pathToPilots, JSON.stringify(pilots, null, 2));
            return { status: "success", message: "Added 1 pilot" }
        } else {
            pilot.id = 1;
            await fs.promises.writeFile(pathToPilots, JSON.stringify([pilot], null, 2));
            return { status: "success", message: "Added 1 pilot" }
        }
    }
    get = async() => {
        if (fs.existsSync(pathToPilots)) {
            try {
                let data = await fs.promises.readFile(pathToPilots, 'utf-8');
                let pilots = JSON.parse(data);
                return { status: "success", payload: pilots }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", payload: [] }
        }
    }
}
module.exports = PilotsManager;
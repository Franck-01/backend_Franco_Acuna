const fs = require("fs");

const pathToClones = "./archives/clones.json"
class Administrator {
    saveClone = async(clone) => {
        if (!clone.name || !clone.rank || !clone.num_serie) return { status: "error", error: "lost information" }
        try {
            if (fs.existsSync(pathToClones)) {
                let data = await fs.promises.readFile(pathToClones, "utf-8")
                let clones = JSON.parse(data)
                let id = clones[clones.length - 1].id + 1
                clone.id = id
                clones.push(clone)
                await fs.promises.writeFile(pathToClones, JSON.stringify(clones, null, 2))
                return { status: "sucess", message: "Clon created" }
            } else {
                clone.id = 1
                await fs.promises.writeFile(pathToClones, JSON.stringify([clone], null, 2))
                return { status: "sucess", message: "Clon created" }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }

    getById = async(id) => {
        if (fs.existsSync(pathToClones)) {
            let data = await fs.promises.readFile(pathToClones, "utf-8")
            let clones = JSON.parse(data)
            let clone = clones.find(u => u.id === id)
            if (clone) return { status: "succes", clone: clone }
            else return { status: "error", error: "clon not found" }
        }
    }

    getAll = async() => {
        if (fs.existsSync(pathToClones)) {
            let data = await fs.promises.readFile(pathToClones, "utf-8")
            let clones = JSON.parse(data)
            return { status: "success", load: clones }
        }
    }

    deleteById = async(id) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(pathToClones)) {
            let data = await fs.promises.readFile(pathToClones, "utf-8")
            let clones = JSON.parse(data)
            let newClone = clones.filter(clone => clone.id !== id)
            await fs.promises.writeFile(pathToClones, JSON.stringify(newClone, null, 2))
            return { status: "success", message: "clon delete" }
        }
    }

    deleteAll = () => {
        fs.unlinkSync("./archives/clones.json")
        return { status: "success", message: "clon delete" }
    }
}


module.exports = Administrator;
const fs = require("fs")
const principalPath = __dirname + "/../files/principal.json"

const fetch = async() => {
    let data = await fs.promises.readFile(principalPath, "utf-8", null, 2)
    let principal = JSON.parse(data)
    return principal
}

class principalManager {
    getAll = async() => {
        if (fs.existsSync(principalPath)) {
            try {
                let principal = await fetch()
                return { status: "success", pauload: principal }
            } catch (error) {
                return { status: "success", error: error }
            }
        } else {
            return { status: "success", pauload: [] }
        }
    }
    add = async(prin) => {
        if (fs.existsSync(principalPath)) {
            try {
                let principal = await fetch()
                if (principal.length == 0) {
                    prin.id = 1
                    principal.push(prin)
                    await fs.promises.writeFile(principalPath, JSON.stringify(principal, null, 2))
                    return { status: "success", message: "the first of all" }
                }
                prin.id = principal[principal.length - 1].id + 1
                principal.push(prin)
                await fs.promises.writeFile(principalPath, JSON.stringify(principal, null, 2))
                return { status: "success", message: "the first of all" }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            try {
                prin.id = 1;
                await fs.promises.writeFile(principalPath, JSON.stringify([prin], null, 2));
                return { status: "success", message: "Array Created!" }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }
}
module.exports = principalManager
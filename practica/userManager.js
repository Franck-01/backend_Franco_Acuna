const fs = require("fs");

const pathToUsers = "./files/users.json"
class UserManager {
    saveUser = async(user) => {
        if (!user.first_name || !user.username || !user.mail) return { status: "error", error: "missing fields" }
        try {
            if (fs.existsSync(pathToUsers)) {
                let data = await fs.promises.readFile(pathToUsers, "utf-8")
                let users = JSON.parse(data);
                let id = users[users.length - 1].id + 1;
                user.id = id
                users.push(user)
                await fs.promises.writeFile(pathToUsers, JSON.stringify(users, null, 2))
                return { status: "sucess", message: "User created" }
            } else {
                user.id = 1
                await fs.promises.writeFile(pathToUsers, JSON.stringify([user], null, 2))
                return { status: "sucess", message: "User created" }
            }
        } catch (error) {
            return { status: "error", message: error }
        }
    }

    findAll = async() => {
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, "utf-8")
            let users = JSON.parse(data)
            return { status: "success", load: users }
        }
    }

    findById = async(id) => {
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, "utf-8")
            let users = JSON.parse(data)
            let user = users.find(u => u.id === id)
            if (user) return { status: "succes", user: user }
            else return { status: "error", error: "User not found" }
        }
    }

    updateUser = async(id, updatedUser) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, "utf-8")
            let users = JSON.parse(data)
            let newUsers = users.map((user) => {
                if (user.id === id) {
                    updatedUser.id = id
                    return updatedUser
                } else {
                    return user
                }
            })
            await fs.promises.writeFile(pathToUsers, JSON.stringify(newUsers, null, 2))
            return { status: "success", message: "user Uptate" }
        }
    }
    deleteUser = async(id) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, "utf-8")
            let users = JSON.parse(data)
            let newUsers = users.filter(user => user.id !== id)
            await fs.promises.writeFile(pathToUsers, JSON.stringify(newUsers, null, 2))
            return { status: "success", message: "user delete" }
        }
    }
}

module.exports = UserManager;
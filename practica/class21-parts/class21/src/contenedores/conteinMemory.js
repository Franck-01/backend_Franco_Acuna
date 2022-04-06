import faker from "faker"

const { datatype } = faker
export default class conteinMemory {
    constructor() {
        this.users = []
    }
    listarAll = () => {
        return this.users
    }
    listar = (id) => {
        let element = this.users.find(el => el.id === id)
        return element ? element : null
    }
    guardar = (user) => {
        user.id = datatype.uuid()
        this.users.push(user)
        return user
    }
    actualizar = (id, user) => {
        let index = this.users.findIndex(el => el.id === id)
        user.id = this.users[index].id
        this.users[index = user]
        return user
    }
    borrar = (id, user) => {
        let index = this.users.findIndex(el => el.id === id)
        this.users.splice(index, 1)
        return true
    }
}
import conteinMemory from "../contenedores/conteinMemory.js";
import faker from "faker";

export default class UserMock extends conteinMemory {
    constructor() {
        super()
    }
    popular = (cant = 50) => {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            nuevos.push({
                name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                id: faker.datatype.uuid()
            })
        }
        this.users = [...this.users, nuevos]
        return nuevos
    }
}
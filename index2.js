const Administrator = require("./administrator.js")
const userServices = new Administrator

class clone {
    constructor(name, rank, designation, num_serie, squadron) {
        this.name = name,
            this.rank = rank,
            this.designation = designation,
            this.num_serie = num_serie,
            this.squadron = squadron
    }
}

const clon = new clone("Rex", "Capitan", "clon de infanteria", "CT-7567", "Legion 501")
const clon = new clone("Cody", "Comandante", "clon de infanteria", "CT-2224", "Batallon 212")
const clon = new clone("Hunter", "Sargento", "clon de infanteria", "CT-9901", "Escuadron 99")
const clon = new clone("Cincos", "Cabo", "clon de ARC", "CT-5555", "Legion 501")
const clon = new clone("Yularen", "Almirante", "oficiales de armada", "null", "Legion 501")
const clon = new clone("Gregor", "Capitan", "clon comando", "CT-5576", "batallon 212")
const clon = new clone("Hawk", "Teniente", "piloto de la armada", "CT-8103", "Legion 501")

userServices.saveClone(clon).then(result => console.log(result))
userServices.getById(2).then(result => console.log(result))
userServices.getAll().then(result => console.log(result))
userServices.deleteById(3).then(result => console.log(result))
userServices.deleteAll()
const Administrator = require("./administrator.js")
const userServices = new Administrator

class ship {
    constructor(name, model, cost, img_url) {
        this.name = name,
            this.model = model,
            this.cost = cost,
            this.img_url = img_url
    }
}

//const repu = new ship("Venator", "Destructor Estelar", 59000000, "https://i.pinimg.com/originals/08/ae/6c/08ae6c35db460ca5c06cdb7e87eb07fa.jpg")
//const repu = new ship("Arquitens", "Crucero Ligero", 4000000, "https://qph.fs.quoracdn.net/main-qimg-1446b508a15d9d0a668ad2a68ec8d223-pjlq")
//const repu = new ship("ARC-170 Starfighter", "Caza de combate", 150000, "https://i.pinimg.com/originals/c9/21/b9/c921b926bf13588e2fb7203f21e53938.jpg")
//const repu = new ship("Clone Head Hunter Z-95", "Caza de combate", 75000, "http://pm1.narvii.com/6245/0b971eb50fa1bcd128c4ebd2df779627e535c512_00.jpg")
//const repu = new ship("(BTL-B) Ala-Y", "Bombardero", 140000, "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-medium-vehicles-page-btl-b-y-wing-7x2-xl.jpg.adapt.crop16x9.320w.jpg")

//userServices.saveProduct(repu).then(result => console.log(result))
userServices.getAll().then(result => console.log(result))
userServices.randomProduct().then(result => console.log(result))
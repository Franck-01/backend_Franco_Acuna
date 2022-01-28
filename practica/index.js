const UserManager = require("./userManager.js")
const userServices = new UserManager();

let user = {
    first_name: "Von",
    last_name: "Manstein",
    username: "Fuhrer45",
    age: 66,
    mail: "correrVonMans@mail.com"
}

//userServices.saveUser(user).then(result => console.log(result))
//userServices.findAll().then(result => console.log(result))
//userServices.findById(2).then(result => console.log(result))
//userServices.updateUser(3, user).then(result => console.log(result))
userServices.deleteUser(3).then(result => console.log(result))
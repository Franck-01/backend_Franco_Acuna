const {ModelNotFoundException} = require("@adonisjs/lucid/src/Exceptions/index.js")

const Cupkage = use("App/Models/Cupkage")
//ARMO UNA CLASE
class CupkageControllers{
    async getCupkageAll({view}){
        const cupkages = (await Cupkage.all()).toJSON()
        //renderizo la info
        return view.render("cupkage",{cupkages})
    }
}

module.exports=CupkageControllers
const mongoose = require("mongoose")
const cartService = require("../../models/cartsSchema.js")

mongoose.connect("mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/projectoStar?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) throw new Error("Cannot connect to Mongo")
    console.log("DB carrito conectada");
})

class cartM_Mongo {
    Create = async(cart) => {
        await cartService.insertMany([cart])
        return { status: "success", message: "Cart Created" }
    }
    Read = async() => {
        let cart = await cartService.fing({}, {
            name: 1,
            cart: 1,
            _id: 0
        })
        return { status: "success", payload: cart }
    }
    Update = async(_id, cart_body) => {
        await cartService.updateOne({
            id: _id
        }, {
            $set: {
                name: cart_body.name
            }
        })
        return { status: "success", message: "cart update" }
    }
    Delete = async(_id) => {
        await cartService.deleteOne({
            id: _id
        })
        return { status: "success", message: "cart delete" }
    }
}

module.exports = cartM_Mongo
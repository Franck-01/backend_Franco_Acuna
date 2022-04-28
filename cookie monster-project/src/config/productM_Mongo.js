const mongoose = require("mongoose")
const productService = require("../models/productsSchema.js")

mongoose.connect("mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/projectoStar?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) throw new Error("Cannot connect to Mongo")
    console.log("DB productos conectada");
})

class ProductM_Mongo {
    Create = async(product) => {
        if (!product.name || !product.model || !product.stock || !product.price) return { status: 'error', error: 'Missing property' }
        await productService.insertMany([product])
        return { status: "success", message: "Product Created" }
    }
    Read = async() => {
        let product = await productService.fing({}, {
            name: 1,
            product: 1,
            _id: 0
        })
        return { status: "success", payload: product }
    }
    Update = async(_id, p_body) => {
        await productService.updateOne({
            id: _id
        }, {
            $set: {
                name: p_body.name,
                model: p_body.model,
                price: p_body.price,
                stock: p_body.stock
            }
        })
        return { status: "success", message: "product update" }
    }
    Delete = async(_id) => {
        if (isNaN(_id)) return { status: 'error', error: `${_id} it's not a number` }
        await productService.deleteOne({
            id: _id
        })
        return { status: "success", message: "product delete" }
    }
}

module.exports = ProductM_Mongo
const mongoose = require("mongoose")
const productService = require("../models/ProductsSchema.js")
const mongoConfig = require("../mongo_config.js")
const dotenv = require("dotenv")

dotenv.config()

const URL = process.env.URL

mongoose.connect("mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/ProyectFinal?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info('Connect to DB')
})

const productServices = new productService()

class ProductM_Mongo {
    Create = async(product) => {
        if (!product.name || !product.model || !product.category || !product.url || !product.price || !product.stock ) return { status: 'error', error: 'Missing property' }
        await productServices.find({ name: product.name })
        if(exist.length !=0) return {status:"error",message:"Product Already Created"}
        await productServices.insertMany(product)
        return { status: "success", message: "Product Created" }
    }
    Read = async() => {
        let product = await productServices.find({}, {
            name: 1,
            product: 1,
            _id: 0
        })
        return { status: "success", payload: product }
    }
    ReadId = async (id) => {
        if (!id) return { status: "error", message: "ID nedded" }
        try {
            let result = await productService.find({
                _id:id
            })
        } catch (error) {
            return {status:"error", error:"ID not found"}
        }
    }
    Update = async (_id, p_body) => {
        if (!id) return { status: "error", error: "Id nedded" }
        if (!product.name || !product.model || !product.category || !product.url || !product.price || !product.stock ) return{status:"error", message:"data missing"}
        try {
            let result= await productServices.updateOne({
                id: _id
            }, {
                $set: {
                    name: p_body.name,
                    model: p_body.model,
                    category: p_body.category,
                    url: p_body.url,
                    price: p_body.price,
                    stock: p_body.stock
                }
            })
            return { status: "success", message: "product update", payload:result }
        } catch {
             return {status:"error",error:error}
        }
    }
    Delete = async (_id) => {
        if (!id) return { status: "error", error: "Id needed" }
        try {
            let result = await productService.deleteOne({
                id: _id
            })
            return { status: "success", message: "product delete", payload:result }
        } catch (error) {
            return{status:"error", error:error}
        }
    }
}

module.exports = ProductM_Mongo
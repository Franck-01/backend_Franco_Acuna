const mongoose = require("mongoose")

const collection = "carts_final"
const schema = new mongoose.Schema({
    produts: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(collection, schema)
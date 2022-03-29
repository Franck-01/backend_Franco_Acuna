const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (error) throw new Error("Cannot connect to Mongo")
    console.log("Base conectada");
})
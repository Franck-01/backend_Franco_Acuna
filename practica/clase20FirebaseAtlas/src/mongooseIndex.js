const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Marisol:123@pruebamarys.prhvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},err=>{
    if(err) throw new Error("Cannot connect to Mongo")
    console.log("Base conectada");
})
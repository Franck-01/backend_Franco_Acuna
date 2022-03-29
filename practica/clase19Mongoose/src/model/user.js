import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    //¿Qué necesita tener cada usuario?
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        required:true
    }
})

export const usersService = mongoose.model(userCollection,userSchema);
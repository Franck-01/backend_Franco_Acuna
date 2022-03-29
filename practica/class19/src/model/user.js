import mongoose from "mongoose"

const userModel = "users"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: Number,
    email: {
        type: String,
        required: true
    }
})

export const userServices = mongoose.model(userModel, userSchema)
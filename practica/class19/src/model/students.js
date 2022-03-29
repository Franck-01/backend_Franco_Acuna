import mongoose from "mongoose";

const studentModel = "estudiantes";

const studentSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true //Dato Unico(No se repite)
    },
    curso: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true
    },
    password: {
        type: Number,
    },
    ingreso: {
        type: Boolean
    }
})

export const studentsService = mongoose.model(studentModel, studentSchema)
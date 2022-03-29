import mongoose from "mongoose";
import { userServices } from "./model/user.js";
import { studentsService } from "./model/students.js";

const URL = "mongodb://127.0.0.1:27017/proyectc9"
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

const CRUD = async() => {
    const studentInsert = [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
    ]

    //INSERT
    /*let result = await studentsService.insertMany(studentInsert)
    console.log(result)*/

    //UPDATE ---- Corroborar que este en el Schema
    /*let userUpdate = await studentsService.updateOne({ nombre: "Pedro" }, {
        $set: { password: 423465 }
    })
    console.log(userUpdate)*/

    //READS
    /*let users = await studentsService.find()
    console.log(users)*/

    //DELETE
    /*let deletes = await studentsService.deleteMany({})
    console.log(deletes)*/


    //---------------------------------------------------//
    /*   ORDEN
    let students = await studentsService.find().sort({ nombre: 1 })
    console.log(students)*/

    /*    EL MAS JOVEN
    let students = await studentsService.find().sort({ edad: 1 }).limit(1)
    console.log(students)*/

    /*ESTUDIANTES DE 2A 
    let students = await studentsService.find({curso:"2A"});
    console.log(students)*/

    /*SEGUNDO MÁS JOVEN 
    let student = await studentsService.find().sort({edad:1}).skip(1).limit(1);
    console.log(student)*/

    /* PROJECTION + SORT 
    let students = await studentsService.find({},{nombre:1,apellido:1,curso:1,_id:0}).sort({apellido:-1})
    console.log(students)*/

    /* NOTA DE 10 
     let students = await studentsService.find({nota:10})
     console.log(students)*/

    /*PROMEDIO GENERAL 
     let students = await studentsService.aggregate(
         [
             {
                 $group:{
                     _id:1,
                     promedio:{$avg:"$nota"}
                 }
             }
         ]
     )
     console.log(students)*/

    /* PROMEDIO POR GRUPO
     let students = await studentsService.aggregate(
         [
             {
                 $group:{
                     _id:"$curso",
                     promedio:{$avg:"$nota"}
                 }
             },
         ]
    )
    console.log(students)*/

    /* ACTUALIZAR LUCAS BLANCO
    let result = await studentsService.findOneAndUpdate({nombre:"Lucas",apellido:"Blanco"},{$set:{dni:"20355875"}})
    console.log(result)*/

    /* CREAR CAMPOS EN TODOS LOS ESTUDIANTES
    let result = await studentsService.updateMany({},{$set:{ingreso:false}})
    console.log(result)*/

    /* MODIFICAR SEGÚN CURSO 
    let result = await studentsService.updateMany({curso:"1A"},{$set:{ingreso:true}})
    console.log(result)*/

    /* SÓLO APROBADOS 
    let result = await studentsService.find({nota:{$gte:4}},{_id:0,__v:0})
    console.log(result)*/

    /*SÓLO INGRESADOS 
    let students  = await studentsService.find({ingreso:true},{_id:0,__v:0})
    console.log(students)*/

    /*BORRAR POR CURSO 
    let result = await studentsService.deleteMany({ ingreso: true })
    console.log(result);*/
}

CRUD()
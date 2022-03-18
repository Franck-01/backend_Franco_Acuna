import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);
const cars =[
    {name:"Volvo",price:34123},
    {name:"Audi",price:23412},
    {name:"Citroen",price:21111},
    {name:"Hummer",price:31234},
    {name:"Bentley",price:16703},
    {name:"Volkswagen",price:23122},
    {name:"Skoda",price:35857},
    {name:"Mercedes",price:46312}
]
database('cars').insert(cars)
.then(console.log)
.catch(console.log)
.finally(()=>database.destroy())
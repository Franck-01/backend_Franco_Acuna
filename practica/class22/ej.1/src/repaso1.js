const { normalize, denormalize, schema } = require("normalizr")
const holding = require("./products.json")

const employeeSchema = new schema.Entity("employees")
const companySchema = new schema.Entity("companies", {
    gerente: employeeSchema,
    encargado: employeeSchema,
    empleados: [employeeSchema]
})
const holdingSchema = new schema.Entity("holding", {
    empresas: [companySchema]
})
let normalizedData = normalize(holding, holdingSchema)
    //console.log(JSON.stringify(normalizedData, null, "\t"))

let originalData = denormalize(normalizedData.result, holdingSchema, normalizedData.entities)
console.log(originalData)
const faker = require("faker")
faker.locale = "es"

const { name, internet, random, datatype } = faker

let objs = []
for (let i = 0; i < 100; i++) {
    objs.push({
        first_name: name.firstName(),
        last_name: name.lastName(),
        email: internet.email(),
        id: datatype.uuid()
    })
}
console.log(objs)
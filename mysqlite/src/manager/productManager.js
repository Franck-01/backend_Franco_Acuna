const options = require("./options/mysqlconfig.js")
const knex = require("knex")

const database = knex(options)

class productsManager {
    getAll = async() => {
        let tableExists = await database.schema.hasTable("products")
        if (tableExists) {
            let products = await database("products").select("*")
            let result = JSON.parse(JSON.stringify(products))
            return { status: "success", payload: products, message: result }
        } else {
            console.log("The table does not exist")
        }
    }
    add = async(product) => {
        let tableExists = await database.schema.hasTable("products")
        if (tableExists) {
            let products = await database("products").insert(product)
            let result = JSON.parse(JSON.stringify(products))
            return { status: "sucess", payload: products, message: result }
        } else {
            await database.schema.createTable("products", (table) => {
                    table.increments("id").nullable(false);
                    product.name = table.string("name", 25).nullable(false);
                    product.model = table.string("model", 30).nullable(false);
                    product.description = table.string("description", 100).nullable(false);
                    product.price = table.integer("price").nullable(false);
                    product.img_URL = table.string("img_URL", 100).nullable(false);
                    product.code = table.string('code', 10).nullable(false);
                    product.stock = table.integer("stock").nullable(false)
                })
                .then(() => console.log("product save"))
                .catch((err) => console.log(err))
                .finally(() => database.destroy())
        }
    }
}

module.exports = productsManager
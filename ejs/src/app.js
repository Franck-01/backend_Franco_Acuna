const express = require("express")
const produc = require("./routes/products")
const app = express()

const server = app.listen(8080, () => console.log("Welcome to my server"))

app.set('views', __dirname + '/views')
app.set('routes', __dirname + '/routes')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let users = [];
let ecommers = []
app.get("/", (req, res) => {
    res.render("index.ejs", {
        users,
        ecommers
    })
})
app.get('/', (req, res) => {

    res.render('usersCreated', {
        users
    })
})
app.post('/users', (req, res) => {
    users.push(req.body);
    res.redirect('/')
})
app.get('/products', (req, res) => {
    res.render("productsArray", {
        ecommers
    })
    app.use("/products", produc)
})
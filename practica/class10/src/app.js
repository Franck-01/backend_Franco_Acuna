const express = require("express")
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => console.log("Welcome to the server"))

/*app.set("views", __dirname + "/views")
app.set("view engine", "pug")

app.get('/', (req, res) => {
    res.render('hello', {
        message: "Holo coders"
    })
})
app.get('/datos', (req, res) => {
    let { min, nivel, max, titulo } = req.query;
    res.render('progress', {
        min,
        nivel,
        max,
        titulo
    })
})*/

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


let users = [];
app.get('/', (req, res) => {

    res.render('home', {
        users
    })
})
app.post('/users', (req, res) => {
    users.push(req.body);
    res.redirect('/')
})
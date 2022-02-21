const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const server = app.listen(8080, () => console.log("Welcome to the server"))


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

let llamadaABaseDeDatos = () => {
    return [
        { first_name: "Mariana", last_name: "Juarez Almaraz", age: 49 },
        { first_name: "Horacio", last_name: "Ferrari", age: 59 },
        { first_name: "Franco", last_name: "Acuña", age: 20 }
    ]
}
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/', (req, res) => {
    let users = llamadaABaseDeDatos();
    res.send(users);
    res.render('users', { users: users });
})
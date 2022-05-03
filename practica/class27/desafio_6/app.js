const express = require("express");
const dotenv = require("dotenv");

const ambiente = process.env.NODE_ENV == "development" ?
    ".env.development" : ".env.production";

dotenv.config({
    path: ambiente
});
console.log(process.env)
console.log(process.env.URL_DB)
const URL = process.env.URL_DB;

const app = express()
app.listen(8080, () => console.log(`listening on port 8080`))

app.get("/datos", (req, res) => {
    fetch(URL)
        .then(res => res.json())
        .then(data => res.send(data))
})
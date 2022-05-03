const express = require("express");
require("dotenv").config()

console.log(process.env)
const PORT = process.env.PORT;
const app = express()
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
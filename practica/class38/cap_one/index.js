const express = require("express");
const routerUser = require("./src/routes/user.js");

const app = express();

app.use("/api", routerUser);

app.listen(8080, () => {
    console.log("Server ok!");
});
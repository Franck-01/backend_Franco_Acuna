const express = require("express");
const routerProduct = require("./src/routes/products.Route");

const app = express();
app.use(express.json());

app.use("/api", routerProduct);

app.listen(8082, () => {
  console.log("Server ok!");
});

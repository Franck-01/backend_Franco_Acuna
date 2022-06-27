const express = require("express")
const cors = require("cors")
const routerUsers = require("./src/routes/user.routes.js")

const app = express();
const PORT = process.env.PORT || 8080;

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.json());
app.use("/api", routerUsers);

app.listen(PORT, () => {
    console.log(`Server run on Port ${PORT}`);
});
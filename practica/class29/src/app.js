const express = require("express");
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        //codigo
    }
    res.send(`corriendo en el proceso ${process.pid} archivo nuevo modificado`);
})

app.listen(PORT, () => console.log(`running on ${process.pid} port ${PORT}`));
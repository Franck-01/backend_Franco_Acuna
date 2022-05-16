const express = require("express")
const app = express()

// app.use(express.static("public"));

// app.get("/",(req,res)=>{
//     res.sendFile("index.html")
// })

const PORT = process.argv[2] || 8080

app.get("/datos", (req, res) => {
    res.send(`<h1>soy el servidor express con datos corriendo en el proceso  ${process.pid}</h1>`)
})

app.listen(PORT, () => {
    console.log(`LISTING IN PORT ${PORT} in process ${process.pid}`)
})
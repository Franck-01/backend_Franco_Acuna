const http = require("http")

const server = http.createServer((request, response) => {
    let currentTime = new Date().getHours()
    if (currentTime >= 6 && currentTime <= 12) response.end("Buenos Días")
    if (currentTime >= 13 && currentTime <= 19) response.end("Buenas Tardes")
    if (currentTime >= 20 && currentTime <= 5) response.end("Buenos Noches")
    console.log(currentTime)
})
const connectServer = server.listen(8080, () => {
    console.log("Server listening on port 8080")
})
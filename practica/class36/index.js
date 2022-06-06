const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());
// Credenciales
const acountId = "ACbccf62f6f1fa9a6907d243365f2270d9";
const authToken = "5b3df0f6dbb9bbfd3c22cb7f7d6f9c47";

const client = twilio(acountId, authToken);

// ruta post
app.post("/twilio", async(req, res) => {
    const options = {
        body: req.body.message,
        mediaUrl: req.body.img,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5491121899785",
    };
    try {
        const message = await client.messages.create(options);
        res.send({ data: message });
    } catch (error) {
        console.log(error);
    }
});

app.listen(8080, () => {
    console.log("Server ok!");
});
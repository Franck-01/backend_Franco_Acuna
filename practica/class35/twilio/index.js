const express = require("express");
const twilio = require("twilio");

const app = express();

// credenciales
const accountId = "ACbccf62f6f1fa9a6907d243365f2270d9";
const authToken = "5b3df0f6dbb9bbfd3c22cb7f7d6f9c47";

const client = twilio(accountId, authToken);

app.post("/twilio-coder", async(req, res) => {
    try {
        const message = await client.messages.create({
            // cuerpo del mensaje
            body: "Hola soy uyn SMS desde nodeJS",
            from: "+19785888948",
            to: "+5491121899785",
        });

        console.log(message);
        res.send({ data: message });
    } catch (error) {
        console.log(error);
    }
});

app.listen(8080, () => {
    console.log("Server OK!");
});
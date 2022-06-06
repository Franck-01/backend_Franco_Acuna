const express = require("express");
const { createTransport } = require("nodemailer");

const app = express();

const TEST_EMAIL = "kadin.blick87@ethereal.email";
const TEST_PASSWORD = "pRr6t8zfWWPcPgRQNa";

const cardTemplate = `
        <div class="card" style="width: 18rem;">
        <img src="https://pbs.twimg.com/media/EbepWNrX0AAwqNc.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
`;

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: TEST_EMAIL,
        pass: TEST_PASSWORD,
    },
});

// VAMOS A CONSTRUIR LA ESTRUCTURA DE UN MAIL --> de que se compone un email??
/*
 - de donde viene?.. un from
 - A donde va?.. un To
 - subject
 - body
*/

// Estructura mail
const mailOptions = {
    from: "Server NodeJS",
    to: TEST_EMAIL,
    subject: "Mail de prueba desde NodeJS",
    html: cardTemplate,
};

/* ---------------- ruta para enviar un mail usando etherial ---------------- */
app.post("/email-coder", async(req, res) => {
    // configuracion
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(info);
        res.send("Email enviado a " + TEST_EMAIL);
    } catch (error) {
        console.log(error);
    }
});

app.listen(8080, () => {
    console.log("Server ok!!");
});
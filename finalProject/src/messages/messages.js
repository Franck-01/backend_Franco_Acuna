const { createTransport } = require("nodemailer")
const twilio = require("twilio")

const EMAIL_Admin = "franconacuna5701@gmail.com"
const EMAIL_USER = []
const PASSWORD = ""

const warning = `
        <div class="card" style="width: 18rem;">
        <img src="https://i.pinimg.com/originals/91/1a/74/911a746a6c46b17bfbcc2921ddfef376.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Nuevo Usuario Ingresado</h5>
            <a href="#" class="btn btn-primary">Tu eres el ADMIN</a>
        </div>
        </div>
`;
const admin_transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: EMAIL_Admin,
        pass: PASSWORD,
    },
})
const admin_mailOptions = {
    from: "Server NodeJS",
    to: EMAIL_Admin,//(para el admin)
    subject: "Aviso de nuevo usuario ingresado",
    html: warning,
}

const welcome = `
        <div class="card" style="width: 18rem;">
        <img src="https://i.ytimg.com/vi/mJZsXTv-N9k/maxresdefault.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">La llegada del usuario</h5>
            <a href="#" class="btn btn-primary">Ahora que eres usuario tendras tu propio carrito de compras</a>
        </div>
        </div>
`;
const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: EMAIL_USER,
        pass: PASSWORD,
    },
})
const mailOptions = {
    from: "Server NodeJS",
    to: EMAIL_USER,//(para el admin)
    subject: "Aviso de nuevo usuario ingresado",
    html: welcome,
}

const twilioId = "ACbccf62f6f1fa9a6907d243365f2270d9"
const twilioToken = "b4d76bceaf981e7f17f54b7f39277334"

const client = twilio(twilioId, twilioToken)

module.exports={admin_transporter, admin_mailOptions, transporter, mailOptions, client}
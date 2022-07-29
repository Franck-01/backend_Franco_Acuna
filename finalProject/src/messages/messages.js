const { createTransport } = require('nodemailer')

const EMAIL = 'franconacuna5701@gmail.com'
const PASSWORD = 'MG9RpBM9ZDDXbcUp53'

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

module.exports = { EMAIL, transporter}

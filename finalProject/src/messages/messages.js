const { SMTPClient } = require('emailjs')

const EMAIL = 'franconacuna5701@gmail.com'
const PASSWORD = '3QkQmHHh-BH60SVrRzUc8'

const client = new SMTPClient({
  user: EMAIL,
  password: PASSWORD,
  host: 'smtp.your-email.com',
  ssl: true
})

module.exports = {client, EMAIL}

const express = require('express')
require('dotenv').config()

const AWS = require('aws-sdk')

const app = express()
const PORT = process.env.PORT || 8086


AWS.config.update({
    region: 'us-east-1'
})

app.use(express.json());
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:643638325294:notificationEmail"
const sns = new AWS.SNS()


const arr = []

app.get('/', (req, res) => {
    res.send('Test API Clase CODERE   AWS')
})


app.post('/api/user', (req, res) => {
    let { username, password } = req.body

    let obj = {
        id: Math.random(),
        username: username,
        password: password
    }
    arr.push(obj)
    let user = JSON.stringify(obj)


    return sns.publish({
        Message: `nuevo usuario ${user}`,
        Subject: 'Nuevo Usuario',
        TopicArn: SNS_TOPIC_ARN
    }).promise().then(function(data) {
        console.log('Se envio email')
        res.json({
            Operation: 'Save',
            Message: 'Success',
            Item: req.body
        })
    }).catch(function(err) {
        console.log("Error", err)
        res.send('Falla al enviar mail')
    })

    // .then((data) =>{
    //     console.log('Se envio email')
    //     res.json({
    //         Operation: 'Save', 
    //         Message: 'Success',
    //         Item: req.body
    //     })
    // }).catch((err)=>{
    //     console.log("Error")
    //     res.send('Falla al enviar mail')
    // })
})

app.listen(PORT, () => {
    console.log('Server OK!')
})
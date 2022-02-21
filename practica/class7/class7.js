const express = require('express');

const app = express();

const server = app.listen(8080, () => console.log("iniciando el server"))

/*const sentences = "Hola mundo, cómo están";

app.get('/api/sentence', (req, res) => {
    res.send({ sentence: sentences })
})
app.get('/api/letters/:num', (req, res) => {

    '/api/letters/:num'
    '/api/letters/:num/:name'
    let number = req.params.num
    let name= req.params.name
    console.log(number/name) 


    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "not a number" })
    let number = parseInt(param);
    if (number < 1 || number > sentences.length) return res.status(400).send({ error: "Out of bounds" })
    res.send({ letter: sentences.charAt(number - 1) })
})
app.get('/api/words/:num', (req, res) => {
    let param = req.params.num;
    if (isNaN(param)) return res.status(400).send({ error: "not a number" })
    let number = parseInt(param);
    let array = sentences.split(' ');
    if (number < 1 || number > array.length) return res.status(400).send({ error: "Out of bounds" })
    res.send({ word: array[number - 1] })
})*/

let sentence = "Frase inicial";

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/sentence', (req, res) => {
    res.send({ sentence: sentence })
})
app.get('/api/words/:pos', (req, res) => {
    let param = req.params.pos;
    if (isNaN(param)) return res.status(400).send({ error: "not a number" })
    let number = parseInt(param);
    let array = sentence.split(' ');
    if (number < 1 || number > array.length) return res.status(400).send({ error: "Out of bounds" })
    res.send({ word: array[number - 1] })
})
app.post('/api/words', (req, res) => {
    let clientWord = req.body.word;
    sentence = sentence.concat(` ${clientWord}`)
    res.send({ sentence: sentence })
})
app.put('/api/words/:pos', (req, res) => {
    let param = req.params.pos;
    let clientWord = req.body.word;
    if (isNaN(param)) return res.status(400).send({ error: "not a number" })
    let number = parseInt(param);
    let array = sentence.split(' ');
    if (number < 1 || number > array.length) return res.status(400).send({ error: "Out of bounds" })
    array[number - 1] = clientWord;
    sentence = array.join(' ');
    res.send({ newSentence: sentence })
})
app.delete('/api/words/:pos', (req, res) => {
    let param = req.params.pos;
    if (isNaN(param)) return res.status(400).send({ error: "not a number" })
    let number = parseInt(param);
    let array = sentence.split(' ');
    if (number < 1 || number > array.length) return res.status(400).send({ error: "Out of bounds" })
    array.splice(number - 1, 1);
    sentence = array.join(' ');
    res.send({ newSentence: sentence })
})
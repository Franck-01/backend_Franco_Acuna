console.log("inicia aplicacion")

process.on('uncaughtException', (err) => {
    console.log(err)
})

llemarfuncioninexistente();


process.on('exit', () => {
    console.log('aplicacion termino')
})
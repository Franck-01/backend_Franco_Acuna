process.stdout.write("Hola desde el programa \n");
process.stdout.write("Cual es tu nombre?: ");

process.stdin.on('data', data => {
    console.log('mucho gusto ', data.toString())
        //console.log("datos desde consola",data)   ---- (para codigo numeral)
    process.exit();
})
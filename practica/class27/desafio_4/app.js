const { MODO, PORT, USERNAME } = require("./config");
console.log(process.env)
console.log(`server corriendo en modo de ${MODO} en el puerto ${PORT}`);
console.log(`username igual a ${USERNAME}`)
class Usuario {
    constructor(nombre, apellido, mascotas, libros) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.mascotas = mascotas,
            this.libros = libros
    }
    static contador = 0;
    getName() {
        console.log(this.nombre, this.apellido)
    }
    addMascota() {
        console.log(this.mascotas)
    }
    countMascotas() {
        Usuario.contador++
            console.log(Usuario.contador)
    }
    addBook() {
        for (const nombre of libros) {
            console.log(nombre.nombre, nombre.autor)
        }
    }
    getBookNames() {
        for (const nombre of libros) {
            console.log("libros seleccionados", nombre.nombre)
        }
    }
}
const mascotas = {
    nombre: "Gus ",
    raza: "gato "
}
const libros = [
    { nombre: "IT", autor: "Stephen King" },
    { nombre: "Re-Made", autor: "Alex Scarrow" }
];
const user = new Usuario("Franco", "Acuña", `${mascotas.nombre + mascotas.raza}`, `${this.libros}`);
user.getName()
user.addMascota()
user.countMascotas()
user.addBook()
user.getBookNames()
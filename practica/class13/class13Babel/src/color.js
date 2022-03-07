class Color {
    getRandomColor = () => {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        return (`rgb(${red},${green},${blue})`);
    }
}

/*babel ./src o .src/el archivo  para transpilar la carpeta entera o el archivo en especifico*/
class Color{
    randomColor = ():string =>{
        let red:number = Math.floor(Math.random()*255)
        let green:number = Math.floor(Math.random()*255)
        let blue:number = Math.floor(Math.random()*255)
        return `rgb(${red},${green},${blue})`
    }
}
let colorgenerator = new Color();
console.log(colorgenerator.randomColor());
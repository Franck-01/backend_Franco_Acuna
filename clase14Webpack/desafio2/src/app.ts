import express, {Request,Response} from 'express';
import Perimeter from './clases/Perimeter';
import Surface from './clases/Surface';

const app = express();
const perimeterService = new Perimeter();
const surfaceService = new Surface();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
const admin = true;
app.get('/operations',(req:Request,res:Response)=>{
    let figure:string = req.query.figure;
    if(figure==="square"){
        let side:number = parseInt(req.query.side);
        res.send({figure,params:{side},perimeter:perimeterService.square(side),surface:surfaceService.square(side)})
    }
    if(figure==="rectangle"){
        let width:number = parseInt(req.query.width);
        let height:number = parseInt(req.query.height);
        res.send({figure,params:{width,height},perimeter:perimeterService.rectangle(width,height),surface:surfaceService.rectangle(width,height)})
    }
    if(figure==="circle"){
        let radius:number = parseInt(req.query.radius);
        res.send({figure,params:{radius},perimeter:perimeterService.circle(radius),surface:surfaceService.circle(radius)})
    }
})


app.get('/')
app.get('/:id')
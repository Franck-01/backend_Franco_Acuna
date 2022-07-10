import { Controller } from '@nestjs/common';
import {CreateCatDTO} from "./dto/create-cats.dto.js"
import {CatsService} from "./cats.service.ts"
import { get } from 'http';

@Controller('cats')
export class CatsController {
    constructor(private readonly catServices:CatsService){}
    @Post()
    async create(@Body{} createCatDto: CreateCatDTO){
        this.catServices.create(createCatDto)
        return{
            Operation:"Saver",
            Items: createCatDto
        }
    }
    @Get()
    async findAll(){
        return this.catServices.findAll()
    }
}

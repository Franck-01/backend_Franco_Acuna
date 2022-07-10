import { Injectable } from '@nestjs/common';
import {CreateCatDTO} from "../cats/dto/create-cats.dto.ts"

@Injectable()
export class CatsService {
    private readonly cats: CreateCatDTO[] = [];
    create(cat:CreateCatDTO){
        this.cats.push(cat)
    }
    findAll(){
        return this.cats
    }
}

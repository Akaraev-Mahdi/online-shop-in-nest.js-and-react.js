import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './type.model';

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private typeRep: typeof Type){}

    async create(name: string){
        const type = await this.typeRep.create(name)
        return type
    }

    async get(){
        const type = await this.typeRep.findAll()
        return type
    }

    async delete(id: number){
        await this.typeRep.destroy({where: {id}})
    }
}

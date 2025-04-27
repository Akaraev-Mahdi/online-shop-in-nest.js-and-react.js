import { Injectable } from '@nestjs/common';
import { Brand } from './brand.model';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandRep: typeof Brand){}

    async create(name: string){
        const brand = await this.brandRep.create(name)
        return brand
    }

    async get(){
        const brand = await this.brandRep.findAll()
        return brand
    }

    async delete(id){
        await this.brandRep.destroy({where: {id}})
    }
}

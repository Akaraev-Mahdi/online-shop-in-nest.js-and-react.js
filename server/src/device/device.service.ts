import { Injectable } from '@nestjs/common';
import { Device } from './device.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FilesService } from 'src/files/files.service';
import { Type } from 'src/type/type.model';
import { Brand } from 'src/brand/brand.model';
import { Device_info } from './device_info.model';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device) private deviceRep: typeof Device,
        private fileService: FilesService,
        @InjectModel(Device_info) private infoRep: typeof Device_info
    ){}

    async create(dto: CreateDeviceDto, img: string){
        const fileName = await this.fileService.createFile(img)
        const device = await this.deviceRep.create({name: dto.name, price: dto.price, brandId: dto.brandId, typeId: dto.typeId, img: fileName})

        let info = JSON.parse(dto.info)
        if(info){
            for(let i = 0; i < info.length; i++){
                this.infoRep.create({title: info[i].title, description: info[i].description, deviceId: device.id})
            }
        }

        return device
    }

    async get(brandId: number, typeId: number, limit: number, page: number){

        page = page || 1
        limit = limit || 9
        
        let offset = page * limit - limit

        const where = {};
    
        if (typeId) {
          where['typeId'] = typeId;
        }
        
        if (brandId) {
          where['brandId'] = brandId;
        }

        const device = await this.deviceRep.findAndCountAll({
            include: [{model: Brand}, {model: Type}, {model: Device_info}], 
            where,
            limit,
            offset
        })
        return device
    }

    async delete(id: number){
        await this.deviceRep.destroy({where: {id}})
    }

    async getOne(id: number){
        return await this.deviceRep.findOne({where: {id}, include: [{model: Brand}, {model: Type}, {model: Device_info}]})
    }

}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket_item } from './basket_item.model';
import { Basket } from './basket.model';
import { Device } from 'src/device/device.model';
import { Brand } from 'src/brand/brand.model';
import { Device_info } from 'src/device/device_info.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BasketService {
    constructor(
        @InjectModel(Basket_item) private basket_ItemRep: typeof Basket_item,
        @InjectModel(Basket) private basketRep: typeof Basket,
        @Inject(forwardRef(() => UserService)) private userService: UserService
    ){}

    async createBasket(userId: number){
        await this.basketRep.create({userId: userId})
    }

    async addDevice(DeviceId: number, auth: string){
        const userid = await this.userService.userIsActivate(auth)
        await this.basket_ItemRep.create({deviceId: DeviceId, basketId: userid})
    }

    async deleteDevice(DeviceId: number, auth: string){
        const userid = await this.userService.userIsActivate(auth)
        await this.basket_ItemRep.destroy({where: {deviceId: DeviceId, basketId: userid}})
    }

    async getBasket(auth: string){
        const userid = await this.userService.userIsActivate(auth)

        return this.basketRep.findOne({where: {userId: userid},
            include: [
                {
                    model: Basket_item,
                    include: [
                        {
                            model: Device,
                            include: [{model: Brand}, {model: Device_info}]
                        }
                    ]
                }
            ]
        })
    }
}

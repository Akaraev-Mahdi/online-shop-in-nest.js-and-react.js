import { Controller, Delete, Get, Headers, Post, Query} from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(private BasketService: BasketService){}

    @Post()
    addDevice(@Query('DeviceId') DeviceId: number, @Headers('authorization') auth: string){
        return this.BasketService.addDevice(DeviceId, auth)
    }

    @Delete()
    deleteDevice(@Query('DeviceId') DeviceId: number, @Headers('authorization') auth: string){
        return this.BasketService.deleteDevice(DeviceId, auth)
    }

    @Get()
    getBasket(@Headers('authorization') auth: string){
        return this.BasketService.getBasket(auth)
    }
}

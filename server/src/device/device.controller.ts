import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from 'src/user/user.guard';

@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService){}

    @Post()
    @UseGuards(UserGuard)
    @UseInterceptors(FileInterceptor('img'))
    create(@Body() dto: CreateDeviceDto, @UploadedFile() img: string){
        return this.deviceService.create(dto, img)
    }

    @Get()
    get(
        @Query('brandId') brandId: number,
        @Query('typeId') typeId: number,
        @Query('limit') limit: number,
        @Query('page') page: number
    ){
        return this.deviceService.get(brandId, typeId, limit, page)
    }

    @Get('/:id')
    getOne(@Param('id') id: number){
        return this.deviceService.getOne(id)
    }

    @Delete()
    delete(@Query('deviceId') DeviceId: number){
        return this.deviceService.delete(DeviceId)
    }
}

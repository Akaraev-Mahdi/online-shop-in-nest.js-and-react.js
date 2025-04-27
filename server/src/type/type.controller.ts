import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('type')
export class TypeController {
    constructor(private typeService: TypeService){}

    @Post()
    @UseGuards(UserGuard)
    create(@Body() name: string){
        return this.typeService.create(name)
    }

    @Get()
    get(){
        return this.typeService.get()
    }

    @Delete()
    delete(@Query('typeId') typeId: number){
        return this.typeService.delete(typeId)
    }
}
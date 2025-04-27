import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService){}

    @Post()
    @UseGuards(UserGuard)
    create(@Body() name: string){
        return this.brandService.create(name)
    }

    @Get()
    get(){
        return this.brandService.get()
    }

    @Delete()
    delete(@Query('brandId') BrandId: number){
        return this.brandService.delete(BrandId)
    }
}

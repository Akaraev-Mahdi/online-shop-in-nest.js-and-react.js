import { Body, Controller, Get, Post, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { join } from 'path';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('regist')
    regist(@Body() dto: CreateUserDto){
        return this.userService.regist(dto)
    }

    @Post('login')
    login(@Body() dto: CreateUserDto){
        return this.userService.login(dto)
    }

    @Get('activate/:link')
    activate(@Param('link') link: string, @Res() res: Response){
        const filePath = join(__dirname, '..', '..', 'src', 'views', 'index.html')
        this.userService.activation(link)
        res.sendFile(filePath)
    }
}

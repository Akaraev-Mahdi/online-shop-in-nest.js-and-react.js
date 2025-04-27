import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import { MailServices } from 'src/mail/mail.service';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(User) private userRep: typeof User,
    private jwtService: JwtService,
    private mailService: MailServices,
    private basketService: BasketService
    ){}

    async login(dto: CreateUserDto){
        const user = await this.userRep.findOne({where: {email: dto.email}})
        const passwordCompare = await bcrypt.compare(dto.password, user.password)
        if(user && passwordCompare){
            return this.generateToken(user)
        }
        throw new HttpException('email или пароль введены неправильно', HttpStatus.BAD_REQUEST)
    }

    async regist(dto: CreateUserDto){
        const candidate = await this.userRep.findOne({where: {email: dto.email}})
        if (candidate) {
            throw new HttpException('Пользователь с такой почтой уже есть', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const generateLink = uuid.v4();
        const user = await this.userRep.create({...dto, password: hashPassword, activationLink: generateLink})
        await this.basketService.createBasket(user.id)
        await this.mailService.sendActivationMail(user.email, `http://localhost:5000/user/activate/${user.activationLink}`)
        return this.generateToken(user)
    }

    async activation(link: string){
        const user = await this.userRep.findOne({where: {activationLink: link}})
        if(!user){
            throw new HttpException('Неккоректная ссылка активации', HttpStatus.BAD_REQUEST)
        }
        user.isActivated = true
        await user.save();
    }

    async userIsActivate(auth: string){
        try {
            const token = auth.split(' ')[1]
            const decode = this.jwtService.verify(token)
            
            const user = await this.userRep.findOne({where: {id: decode.id}})
            if(user.isActivated !== true){
                throw new UnauthorizedException({message: 'Войдите, или зарегистрируйтесь и активируйте почту.'})
            }
            return user.id
        } catch (error) {
            throw new UnauthorizedException({message: 'Войдите, или зарегистрируйтесь и активируйте почту.'})
        }
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, username: user.username, email: user.email, isActivated: user.isActivated, activationLink: user.activationLink}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}

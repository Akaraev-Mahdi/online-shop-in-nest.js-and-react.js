import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        const authHeader = req.headers.authorization

        if(!authHeader){
            throw new UnauthorizedException({message: 'Пользователь не найден'})
        }

        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }

        const user = this.jwtService.verify(token);
        if(user.email === process.env.EMAIL_FOR_GUARD){
            return true
        }else {
            throw new UnauthorizedException({message: 'Нет доступа'})
        }
    }
}
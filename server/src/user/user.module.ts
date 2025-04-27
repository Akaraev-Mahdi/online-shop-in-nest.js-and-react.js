import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: "SECRET",
      signOptions: {
        expiresIn: '24h'
      }
    }),
    MailModule,
    forwardRef(() => BasketModule)
  ],
  exports: [
    UserService,
    JwtModule
  ]
})
export class UserModule {}

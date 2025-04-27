import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { Basket_item } from './basket_item.model';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [BasketService],
  controllers: [BasketController],
  imports: [
    SequelizeModule.forFeature([Basket, Basket_item]),
    forwardRef(() => UserModule)
  ],
  exports: [BasketService]
})
export class BasketModule {}

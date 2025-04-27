import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from './brand.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    SequelizeModule.forFeature([Brand]),
    UserModule
  ]
})
export class BrandModule {}

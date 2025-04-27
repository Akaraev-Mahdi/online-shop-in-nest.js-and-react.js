import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { TypeModule } from './type/type.module';
import { Type } from './type/type.model';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/brand.model';
import { DeviceModule } from './device/device.module';
import { FilesModule } from './files/files.module';
import { Device } from './device/device.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import * as path from 'path';
import { User } from './user/user.model';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { Device_info } from './device/device_info.model';
import { BasketModule } from './basket/basket.module';
import { Basket } from './basket/basket.model';
import { Basket_item } from './basket/basket_item.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Type, Brand, Device, User, Device_info, Basket, Basket_item],
      autoLoadModels: true
    }),
    
    TypeModule,
    BrandModule,
    DeviceModule,
    FilesModule,
    UserModule,
    MailModule,
    BasketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

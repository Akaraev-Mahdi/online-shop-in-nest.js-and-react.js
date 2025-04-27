import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './device.model';
import { FilesModule } from 'src/files/files.module';
import { UserModule } from 'src/user/user.module';
import { Device_info } from './device_info.model';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [
    SequelizeModule.forFeature([Device, Device_info]),
    FilesModule,
    UserModule
  ]
})
export class DeviceModule {}

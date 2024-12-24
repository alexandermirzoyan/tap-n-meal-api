import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from '../typeorm/entities/Image';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImagesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from '../typeorm/entities/Image';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  create(fileName: string) {
    const newImage = this.imageRepository.create({
      path: `/uploads/${fileName}`,
    });

    return this.imageRepository.save(newImage);
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}

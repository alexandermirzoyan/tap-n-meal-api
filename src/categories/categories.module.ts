import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from '../typeorm/entities/Category';
import { CategoryTranslation } from '../typeorm/entities/CategoryTranslation';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category, CategoryTranslation])],
})
export class CategoriesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LOCALES } from '../constants/locales';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../typeorm/entities/Category';
import { CategoryTranslation } from '../typeorm/entities/CategoryTranslation';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTranslation)
    private categoryTranslationRepository: Repository<CategoryTranslation>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create({
      created_at: new Date(),
      updated_at: new Date(),
    });

    const category = await this.categoryRepository.save(newCategory);
    const createRequest = Object.entries(createCategoryDto);

    for (const [key, value] of createRequest) {
      const [, langCode] = key.split('_');

      const newCategoryTranslation = this.categoryTranslationRepository.create({
        name: value,
        locale_id: LOCALES[langCode],
        category_id: category.id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await this.categoryTranslationRepository.save(newCategoryTranslation);
    }

    return category;
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

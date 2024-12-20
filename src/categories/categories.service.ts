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
        locale: { id: LOCALES[langCode] },
        category: { id: category.id },
        created_at: new Date(),
        updated_at: new Date(),
      });

      await this.categoryTranslationRepository.save(newCategoryTranslation);
    }

    return category;
  }

  findAll(language: string) {
    return this.categoryTranslationRepository.find({
      relations: ['category'],
      select: {
        id: true,
        name: true,
        category: { id: true },
      },
      where: { locale: { id: LOCALES[language] } },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    const categoryTranslations = await this.categoryTranslationRepository.find({
      where: { category: { id } },
    });

    return { ...category, translations: categoryTranslations };
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

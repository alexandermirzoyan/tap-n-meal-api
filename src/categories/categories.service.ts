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
    const creationDate = new Date();
    const newCategory = this.categoryRepository.create({
      created_at: creationDate,
      updated_at: creationDate,
    });

    const category = await this.categoryRepository.save(newCategory);

    for (const [language, value] of Object.entries(createCategoryDto.name)) {
      const newCategoryTranslation = this.categoryTranslationRepository.create({
        name: value,
        locale: { id: LOCALES[language] },
        category: { id: category.id },
        created_at: creationDate,
        updated_at: creationDate,
      });

      await this.categoryTranslationRepository.save(newCategoryTranslation);
    }

    return category;
  }

  async findAll(language: string) {
    const categories = await this.categoryTranslationRepository.find({
      relations: ['category'],
      select: {
        name: true,
        category: { id: true },
      },
      where: { locale: { id: LOCALES[language] } },
    });

    return categories.map((c) => ({ id: c.category.id, name: c.name }));
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    const categoryTranslations = await this.categoryTranslationRepository.find({
      where: { category: { id } },
      relations: { locale: true },
    });

    return { ...category, translations: categoryTranslations };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedAtDate = new Date();

    for (const [language, value] of Object.entries(updateCategoryDto.name)) {
      await this.categoryTranslationRepository.update(
        {
          category: { id },
          locale: { id: LOCALES[language] },
        },
        { name: value, updated_at: updatedAtDate },
      );
    }

    await this.categoryRepository.update({ id }, { updated_at: updatedAtDate });

    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.categoryTranslationRepository.delete({ category: { id } });
    return this.categoryRepository.delete({ id });
  }
}

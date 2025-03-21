import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from '../typeorm/entities/Product';
import { ProductNameTranslation } from '../typeorm/entities/ProductNameTranslation';
import { ProductDescriptionTranslation } from '../typeorm/entities/ProductDescriptionTranslation';

import { LOCALES } from '../constants/locales';
import { ITEMS_PER_PAGE } from '../constants/pagination';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductNameTranslation)
    private productNameRepository: Repository<ProductNameTranslation>,
    @InjectRepository(ProductDescriptionTranslation)
    private productDescriptionRepository: Repository<ProductDescriptionTranslation>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const creationDate = new Date();
    const newProduct = this.productRepository.create({
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      category: { id: createProductDto.category_id },
      image: { id: createProductDto.image_id },
      ...(createProductDto.tag_id && { tag: { id: createProductDto.tag_id } }),
      created_at: creationDate,
      updated_at: creationDate,
    });

    const product = await this.productRepository.save(newProduct);
    const getCommonProps = (key: string) => ({
      product: { id: product.id },
      locale: { id: LOCALES[key] },
      created_at: creationDate,
      updated_at: creationDate,
    });

    for (const [key, value] of Object.entries(createProductDto.name)) {
      const productName = this.productNameRepository.create({
        ...getCommonProps(key),
        name: value,
      });

      await this.productNameRepository.save(productName);
    }

    for (const [key, value] of Object.entries(createProductDto.description)) {
      const productDescription = this.productDescriptionRepository.create({
        ...getCommonProps(key),
        description: value,
      });

      await this.productDescriptionRepository.save(productDescription);
    }

    return product;
  }

  async findAll(
    language: string,
    page = 1,
    category?: string,
    search?: string,
  ) {
    const products = await this.productRepository.find({
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      relations: {
        category: true,
        image: true,
        tag: true,
        name: { locale: true },
        description: { locale: true },
      },
      where: {
        name: {
          locale: { id: LOCALES[language] },
          name: search ? ILike(`%${search}%`) : undefined,
        },
        description: {
          locale: { id: LOCALES[language] },
        },
        category: { id: category ? +category : null },
      },
    });

    const normalizedProducts: any = [...products];
    for (const product of normalizedProducts) {
      product.name = product.name[0].name;
      product.description = product.description[0].description;
    }

    return normalizedProducts;
  }

  async getTotalProductsCount() {
    const [, count] = await this.productRepository.findAndCount();
    return { total: count };
  }

  async findOne(language: string, id: number, authorization?: string) {
    const product = await this.productRepository.findOne({
      relations: {
        category: true,
        image: true,
        tag: true,
        name: { locale: true },
        description: { locale: true },
      },
      where: {
        id,
        name: {
          locale: { id: LOCALES[language] },
        },
        description: {
          locale: { id: LOCALES[language] },
        },
      },
    });

    if (authorization) {
      return product;
    }

    const normalizedProduct: any = { ...product };
    normalizedProduct.name = normalizedProduct.name[0].name;
    normalizedProduct.description =
      normalizedProduct.description[0].description;

    return normalizedProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateDate = new Date();
    const updatedProduct = await this.productRepository.update(
      { id },
      {
        price: updateProductDto.price,
        quantity: updateProductDto.quantity,
        category: { id: updateProductDto.category_id },
        image: { id: updateProductDto.image_id },
        ...(updateProductDto.tag_id && {
          tag: { id: updateProductDto.tag_id },
        }),
        updated_at: updateDate,
      },
    );

    for (const [key, value] of Object.entries(updateProductDto.name)) {
      await this.productNameRepository.update(
        {
          locale: { id: LOCALES[key] },
          product: { id },
        },
        {
          name: value,
          updated_at: updateDate,
        },
      );
    }

    for (const [key, value] of Object.entries(updateProductDto.description)) {
      await this.productDescriptionRepository.update(
        {
          locale: { id: LOCALES[key] },
          product: { id },
        },
        {
          description: value,
          updated_at: updateDate,
        },
      );
    }

    return updatedProduct;
  }

  async remove(id: number) {
    await this.productNameRepository.delete({ product: { id } });
    await this.productDescriptionRepository.delete({ product: { id } });
    return this.productRepository.delete({ id });
  }
}

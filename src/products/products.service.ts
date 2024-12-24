import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../typeorm/entities/Product';
import { ProductNameTranslation } from '../typeorm/entities/ProductNameTranslation';
import { ProductDescriptionTranslation } from '../typeorm/entities/ProductDescriptionTranslation';
import { LOCALES } from '../constants/locales';

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
      image: { id: createProductDto.image_id },
      ...(createProductDto.tag_id && { tag: { id: createProductDto.tag_id } }),
      created_at: creationDate,
      updated_at: creationDate,
    });

    const product = await this.productRepository.save(newProduct);

    for (const [key, value] of Object.entries(createProductDto.name)) {
      const productName = this.productNameRepository.create({
        product: { id: product.id },
        locale: { id: LOCALES[key] },
        name: value,
        created_at: creationDate,
        updated_at: creationDate,
      });

      await this.productNameRepository.save(productName);
    }

    for (const [key, value] of Object.entries(createProductDto.description)) {
      const productDescription = this.productDescriptionRepository.create({
        product: { id: product.id },
        locale: { id: LOCALES[key] },
        description: value,
        created_at: creationDate,
        updated_at: creationDate,
      });

      await this.productDescriptionRepository.save(productDescription);
    }

    return product;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

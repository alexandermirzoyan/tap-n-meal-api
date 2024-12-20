import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../typeorm/entities/Product';
import { ProductNameTranslation } from '../typeorm/entities/ProductNameTranslation';
import { ProductDescriptionTranslation } from '../typeorm/entities/ProductDescriptionTranslation';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductNameTranslation,
      ProductDescriptionTranslation,
    ]),
  ],
})
export class ProductsModule {}

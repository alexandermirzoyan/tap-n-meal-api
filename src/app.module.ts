import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Locale } from './typeorm/entities/Locale';
import { Tag } from './typeorm/entities/Tag';
import { Image } from './typeorm/entities/Image';
import { Category } from './typeorm/entities/Category';
import { CategoryTranslation } from './typeorm/entities/CategoryTranslation';
import { Product } from './typeorm/entities/Product';
import { ProductNameTranslation } from './typeorm/entities/ProductNameTranslation';
import { ProductDescriptionTranslation } from './typeorm/entities/ProductDescriptionTranslation';
import { Order } from './typeorm/entities/Order';
import { OrderProduct } from './typeorm/entities/OrderProduct';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../public') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Locale,
        Tag,
        Image,
        Category,
        CategoryTranslation,
        Product,
        ProductNameTranslation,
        ProductDescriptionTranslation,
        Order,
        OrderProduct,
      ],
      synchronize: true,
    }),
    CategoriesModule,
    ProductsModule,
    ImagesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

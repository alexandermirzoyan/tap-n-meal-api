import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../typeorm/entities/Order';
import { OrderProduct } from '../typeorm/entities/OrderProduct';
import { Product } from '../typeorm/entities/Product';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order, OrderProduct, Product])],
})
export class OrdersModule {}

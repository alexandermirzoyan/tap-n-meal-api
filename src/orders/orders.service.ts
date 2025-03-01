import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Order } from '../typeorm/entities/Order';
import { Product } from '../typeorm/entities/Product';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const creationDate = new Date();
    const orders = [];
    const uuid = uuidv4();

    for (const product of createOrderDto.products) {
      const newOrder = this.orderRepository.create({
        uuid,
        product_id: product.id,
        payment_method: createOrderDto.paymentMethod,
        table: createOrderDto.table,
        count: product.quantity,
        comment: product.comment,
        created_at: creationDate,
        updated_at: creationDate,
      });

      orders.push(newOrder);
    }

    await this.orderRepository.save(orders);

    for (const product of createOrderDto.products) {
      await this.productRepository.update(
        { id: product.id },
        {
          quantity: () => `quantity - ${product.quantity}`,
        },
      );
    }

    return { success: true };
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}

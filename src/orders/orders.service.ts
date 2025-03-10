import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../typeorm/entities/Order';
import { Product } from '../typeorm/entities/Product';
import { OrderProduct } from '../typeorm/entities/OrderProduct';
import { CreateOrderDto } from './dto/create-order.dto';
import { ITEMS_PER_PAGE } from '../constants/pagination';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const creationDate = new Date();

    const newOrder = this.orderRepository.create({
      payment_method: createOrderDto.paymentMethod,
      table: createOrderDto.table,
      created_at: creationDate,
      updated_at: creationDate,
    });

    await this.orderRepository.save(newOrder);
    const orderProducts = [];

    for (const product of createOrderDto.products) {
      const newOrderProduct = this.orderProductRepository.create({
        order: { id: newOrder.id },
        product: { id: product.id },
        count: product.quantity,
        comment: product.comment,
      });

      orderProducts.push(newOrderProduct);
    }

    await this.orderProductRepository.save(orderProducts);

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

  async findAll(language: string, page = 1) {
    return await this.orderRepository.find({
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      relations: {
        orderProducts: {
          product: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderProducts: {
          product: true,
        },
      },
    });
  }

  async getTotalOrdersCount() {
    const [, count] = await this.orderRepository.findAndCount();
    return { total: count };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Headers('Language') language: string, @Query('page') page: string) {
    return this.ordersService.findAll(language, +page);
  }

  @Get('/total')
  getTotalOrdersCount() {
    return this.ordersService.getTotalOrdersCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}

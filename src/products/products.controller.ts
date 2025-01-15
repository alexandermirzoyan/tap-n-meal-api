import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Headers('Language') language: string, @Query('page') page: string) {
    return this.productsService.findAll(language, +page);
  }

  @Get('/total')
  getTotalProductsCount() {
    return this.productsService.getTotalProductsCount();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('Language') language: string,
    @Headers('Authorization') authorization: string,
  ) {
    return this.productsService.findOne(language, +id, authorization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  create() {
    return 'This action adds a new product';
  }

  @Get()
  findAll() {
    return 'This action returns all products';
  }

  @Get(':id')
  findOne() {
    return 'This action returns a single product';
  }

  @Patch(':id')
  update() {
    return 'This action updates a product';
  }

  @Delete(':id')
  remove() {
    return 'This action removes a product';
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productServiceClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productServiceClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productServiceClient.send(
      { cmd: 'get_products' },
      paginationDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productServiceClient.send({ cmd: 'get_product' }, { id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productServiceClient.send(
      { cmd: 'update_product' },
      { id, ...updateProductDto },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productServiceClient.send({ cmd: 'delete_product' }, { id });
  }
}

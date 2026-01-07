import { PaginationDto } from '@common/dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, PaginationOrderDto, StatusOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.client.send({ cmd: 'find_all_orders' }, paginationOrderDto);
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'find_one_order' }, { id });
  }

  @Get('status/:status')
  findOneByStatus(
    @Param() StatusOrderDto: StatusOrderDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.client.send(
      { cmd: 'find_all_orders' },
      {
        ...paginationDto,
        ...StatusOrderDto,
      },
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusOrderDto: StatusOrderDto,
  ) {
    return this.client.send(
      { cmd: 'change_order_status' },
      {
        id,
        ...statusOrderDto,
      },
    );
  }
}

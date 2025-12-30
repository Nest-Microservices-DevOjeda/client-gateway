import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ORDERS_SERVICE_HOST,
          port: envs.ORDERS_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}

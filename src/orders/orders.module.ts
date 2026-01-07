import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transport/nats.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}

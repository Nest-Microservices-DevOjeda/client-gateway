import { ORDER_STATUS, type OrderStatus } from '@common/constants';
import { IsIn } from 'class-validator';

export class StatusOrderDto {
  @IsIn(Object.values(ORDER_STATUS))
  status: OrderStatus;
}

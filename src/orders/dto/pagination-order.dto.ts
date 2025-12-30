import { ORDER_STATUS, type OrderStatus } from '@common/constants';
import { PaginationDto } from '@common/dto';
import { IsIn, IsOptional } from 'class-validator';

export class PaginationOrderDto extends PaginationDto {
  @IsIn(Object.values(ORDER_STATUS))
  @IsOptional()
  status?: OrderStatus;
}

import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsPositive } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsInt()
  @IsPositive()
  id: number;
}

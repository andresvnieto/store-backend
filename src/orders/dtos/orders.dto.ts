import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

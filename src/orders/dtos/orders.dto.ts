import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsDate()
  readonly date: Date;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

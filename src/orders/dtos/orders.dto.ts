import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsDate()
  readonly date: Date;
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrdersDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

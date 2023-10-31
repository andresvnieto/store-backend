import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class FilterOrdersDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

export class AddProductsToOrder {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}

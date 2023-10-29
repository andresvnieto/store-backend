import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from '../../categories/dtos/categories.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;
  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}

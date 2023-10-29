import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsUrl()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FilterBrandsDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

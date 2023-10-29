import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
  @IsArray()
  @IsNotEmpty()
  readonly comments: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomersDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

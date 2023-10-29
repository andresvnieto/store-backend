import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del usuario' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

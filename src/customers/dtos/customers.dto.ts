import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerrDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateUserDto extends PartialType(CreateCustomerrDto) {}

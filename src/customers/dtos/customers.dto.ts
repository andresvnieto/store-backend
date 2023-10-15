import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomerrDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateUserDto extends PartialType(CreateCustomerrDto) {}

import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsDate()
  readonly date: Date;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    console.log(metadata);
    if (isNaN(val)) {
      throw new BadRequestException(`${value} no es entero`);
    }
    return value;
  }
}

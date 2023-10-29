import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}

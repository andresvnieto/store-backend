import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand } from '../../brands/entities/brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: Number, required: true, index: true })
  price: number;
  @Prop({ type: String })
  image: string;
  @Prop({ type: Number })
  stock: number;
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({
  price: 1,
  stock: -1,
});

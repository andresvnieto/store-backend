import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({
  price: 1,
  stock: -1,
});

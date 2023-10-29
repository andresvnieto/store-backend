import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

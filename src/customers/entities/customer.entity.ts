import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastname: string;
  @Prop()
  phone: string;
  @Prop({
    type: [
      {
        title: { type: String },
      },
      {
        text: { type: String },
      },
    ],
  })
  comments: Types.Array<Record<string, any>>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

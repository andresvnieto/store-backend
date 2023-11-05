import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from 'src/orders/entities/order.entity';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  orders: Order[];
  @Prop()
  password: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

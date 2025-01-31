import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true }) 
  productId: Types.ObjectId;

  @Prop({ required: true }) 
  quantity: number;

  @Prop({ required: true }) 
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], default: [] }) 
  items: OrderItem[];

  @Prop({ required: true }) 
  totalPrice: number;

  @Prop({ required: true, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }) 
  status: string;
}


export type OrderDocument = Order & Document;


export const OrderSchema = SchemaFactory.createForClass(Order);

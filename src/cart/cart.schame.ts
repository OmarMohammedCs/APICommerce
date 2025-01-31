import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true }) 
  productId: Types.ObjectId;

  @Prop({ required: true, default: 1 }) 
  quantity: number; 

  @Prop({ required: true }) 
  price: number; 
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId; 

  @Prop({ type: [CartItemSchema], default: [] }) 
  items: CartItem[]; 

  @Prop({ required: true, default: 0 }) 
  totalPrice: number;
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);

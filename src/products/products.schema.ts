import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/categories.schame';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0, max: 100, default: 0 })
  discount?: number;

  @Prop()
  productImages?: string[];

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ default: false })
  isAvailable?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category; 


  @Prop({ type: [String], default: [] })
  tags?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

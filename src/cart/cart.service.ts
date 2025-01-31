import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schame';


@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}


  async createCart(userId: string) {
    return this.cartModel.create({ userId, items: [], totalPrice: 0 });
  }


  async addToCart(userId: string, productId: string, price: number, quantity: number = 1) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { $push: { items: { productId, price, quantity } }, $inc: { totalPrice: price * quantity } },
      { new: true, upsert: true }
    );
  }

  async getCart(userId: string) {
    return this.cartModel.findOne({ userId }).populate('items.productId');
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    return this.cartModel.findOneAndUpdate(
      { userId, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
  }


  async removeItem(userId: string, productId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
  }

  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0 },
      { new: true }
    );
  }
}

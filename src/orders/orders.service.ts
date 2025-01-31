import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './orders.shame';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}


  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(createOrderDto);
  }


  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate('userId').populate('items.productId');
  }


  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).populate('userId').populate('items.productId');
  }


  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).populate('items.productId');
  }


  async updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(orderId, { status: updateOrderStatusDto.status }, { new: true });
  }


  async deleteOrder(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(orderId);
  }
}

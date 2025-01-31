import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @Post()
    @UseGuards(AuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }


  @Get(':orderId')
  @UseGuards(AuthGuard)
  async getOrderById(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }


  @Get('user/:userId')
  @UseGuards(AuthGuard)
  async getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  
  @Put(':orderId/status')
  @UseGuards(AuthGuard)
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() updateOrderStatusDto: UpdateOrderDto) {
    return this.orderService.updateOrderStatus(orderId, updateOrderStatusDto);
  }

  
  @Delete(':orderId')
  @UseGuards(AuthGuard)
  async deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }
}

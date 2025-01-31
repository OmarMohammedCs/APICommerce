import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.shame';
import { AuthModule } from 'src/users/guards/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}

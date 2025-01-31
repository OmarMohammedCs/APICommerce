import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './cart.schame';
import { CartController } from './cart.controller';
import { AuthModule } from 'src/users/guards/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),AuthModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Post(':userId')
    @UseGuards(AuthGuard)
  async createCart(@Param('userId') userId: string) {
    return this.cartService.createCart(userId);
  }

  @Post(':userId/add')
  @UseGuards(AuthGuard)
  async addToCart(@Param('userId') userId: string, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(userId, addToCartDto.productId, addToCartDto.price, addToCartDto.quantity);
  }


  @Get(':userId')
  @UseGuards(AuthGuard)
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }


  @Put(':userId/update')
  @UseGuards(AuthGuard)
  async updateCartItem(@Param('userId') userId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(userId, updateCartItemDto.productId, updateCartItemDto.quantity);
  }


  @Delete(':userId/remove/:productId')
  @UseGuards(AuthGuard)
  async removeItem(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(userId, productId);
  }


  @Delete(':userId/clear')
  @UseGuards(AuthGuard)
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}

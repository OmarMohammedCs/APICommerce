import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDto } from './create-cart.dto';

export class UpdateCartItemDto extends PartialType(AddToCartDto) {}

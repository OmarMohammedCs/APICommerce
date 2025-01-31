import { IsNotEmpty, IsNumber, IsString, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string; 

  @IsNumber()
  @Min(1)
  quantity: number; 

  @IsNumber()
  @Min(0)
  price: number; 
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string; 

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]; 

  @IsNumber()
  @Min(0)
  totalPrice: number; 
}


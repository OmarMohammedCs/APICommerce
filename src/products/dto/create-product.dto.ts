import { IsString, IsNumber, IsOptional, Min, Max, IsArray, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => Number(value)) 
  @IsNumber()
  @Min(0)
  price: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount?: number; 
 
  @IsArray()
  @IsOptional()
  productImages?: string[]; 

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  stock: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean; 

  @IsString()
  category: string; 

  @Transform(({ value }) => JSON.parse(value)) 
  @IsArray()
  @IsOptional()
  tags?: string[]; 

}

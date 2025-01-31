import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './products.schema';
import { AuthModule } from 'src/users/guards/auth.module';
import { Category, CategorySchame } from 'src/categories/categories.schame';
import { RoleModule } from 'src/users/guards-admin/roles.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),MongooseModule.forFeature([{name:Category.name,schema:CategorySchame}]),AuthModule,RoleModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

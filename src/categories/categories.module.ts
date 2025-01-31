import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchame } from './categories.schame';
import { AuthModule } from 'src/users/guards/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Category.name,schema:CategorySchame}]),AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

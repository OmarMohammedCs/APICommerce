import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchame } from './users.schema';
import { AuthModule } from './guards/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchame}]),AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

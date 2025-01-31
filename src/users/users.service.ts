import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UpdateUsersDTO } from './dto/updata-users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,private readonly jwtService:JwtService){}

    async createUser(createUserDto: CreateUsersDTO, file: any) {
        const { email , password } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new BadRequestException('Email already exists');
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        createUserDto.password = hash

        

        const newUser = new this.userModel({
            ...createUserDto,
            img: file ? file.path : null,
          });
          return await newUser.save();
     
    }







    async login(loginUserDTO: LoginUserDTO) {
        const { email, password } = loginUserDTO;
        const existingUser = await this.userModel.findOne({ email });
        if (!existingUser) {
          throw new BadRequestException('Email does not exist');
        }
    
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
          throw new BadRequestException('Invalid password');
        }

        const jwt = this.jwtService.sign({ id: existingUser.id })
    
        return {jwt};



    }





      async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
      }
    
     
      async getUserById(id: string): Promise<User | null> {
        const useId = await this.userModel.findById(id)
        if (!id || !useId) {
            throw new Error("Please enter correct ID");
        }
        return this.userModel.findById(id).exec();
      }
    
     
      async updateUser(id: string, updateData: UpdateUsersDTO): Promise<User | null> {
        const useId = await this.userModel.findById(id)
        if (!id || !useId) {
            throw new Error("Please enter correct ID");
        }
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
      }
    
      
      async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
    
        if (!deletedUser) {
          throw new NotFoundException('User with the given ID was not found');
        }
    
        return deletedUser;
      }
}
 